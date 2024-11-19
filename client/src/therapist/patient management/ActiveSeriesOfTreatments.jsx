import { useEffect, useState } from "react";
import "../css/activeSeries.css";

function ActiveSeriesOfTreatments() {
  const [treatmentSeries, setTreatmentSeries] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [changeTreatmentDate, setChangeTreatmentDate] = useState(false);
  const [modalData, setModalData] = useState({ date: "", time: "" });
  const [treatmentId, setTreatmentId] = useState(null);
  const [cancelTreatment, setCancelTreatment] = useState(false);
  const [treatmentDocumentation, setTreatmentDocumentation] = useState(false);

const patient = JSON.parse(localStorage.getItem("selectedPatient"));
    const therapist = JSON.parse(localStorage.getItem("selectedTherapist"));

  useEffect(() => {
    

    fetch(
      "http://localhost:3300/therapist/personalFilePatient/ActiveSeriesOfTreatments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: patient.patientId,
          therapistId: therapist.therapistId,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTreatments(data);
      })
      .catch((error) => {
        console.error("Error fetching Active Series of Treatments:", error);
      });

    fetch(
      "http://localhost:3300/therapist/personalFilePatient/bringingTreatmentSeries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: patient.patientId,
          therapistId: therapist.therapistId,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTreatmentSeries(data);
      })
      .catch((error) => {
        console.error("Error fetching Bringing Treatment Series:", error);
      });
  }, []);

  const handleModalChange = (field, value) => {
    setModalData((prev) => ({ ...prev, [field]: value }));
  };

  function handleSubmitChangeDate() {
    console.log("Treatment ID:", treatmentId);
    
    // fetch(
    //   "http://localhost:3300/therapist/personalFilePatient/changeTreatmentDate",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       treatmentId: treatments[0].id,
    //       date: modalData.date,
    //       time: modalData.time,
    //     }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("Treatment date changed successfully:", data);
    //     setChangeTreatmentDate(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error changing treatment date:", error);
    //   });
setTreatmentId(null);
    setChangeTreatmentDate(false);
  }

  const openDocumentationModal = (treatmentId) => {
setTreatmentId(treatmentId);
    setTreatmentDocumentation(true);

  };

  const openCancelModal = (treatmentId) => {
    setTreatmentId(treatmentId);
    setCancelTreatment(true);
  };

  const openDateChangeModal = (treatmentId) => {
setTreatmentId(treatmentId);
    setChangeTreatmentDate(true);
  };

  return (
    <div className="treatments-container">
      {treatmentSeries.length > 0 && (
        <div className="treatments-goals-box">
          <h2 className="treatments-goals-title">מטרות</h2>
          <p>{treatmentSeries[0].goals}</p>
        </div>
      )}
      {treatments.length > 0 ? (
        <div className="treatments-table-container">
          <table>
            <thead>
              <tr>
                <th>תאריך</th>
                <th>סטטוס</th>
                <th>טיפולים</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td>{treatment.treatment_date}</td>
                  <td>{treatment.status}</td>
                  <td>
                    <button
                      className="treatments-button-doc"
                      onClick={() => openDocumentationModal(treatment.id)}
                    >
                      תיעוד טיפול
                    </button>
                    <button
                      className="treatments-button-cancel"
                      onClick={() => openCancelModal(treatment.id)}
                    >
                      ביטול
                    </button>
                    <button
                      className="treatments-button-change"
                      onClick={() => openDateChangeModal(treatment.id)}
                    >
                      שינוי תאריך
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="treatments-no-treatments">לא נמצאו טיפולים פעילים.</p>
      )}{" "}
      {changeTreatmentDate && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>תאריך טיפול חדש</h2>
            <label>
              תאריך:
              <input
                type="date"
                value={modalData.date}
                onChange={(e) => handleModalChange("date", e.target.value)}
              />
            </label>
            <label>
              שעה:
              <input
                type="time"
                value={modalData.time}
                onChange={(e) => handleModalChange("time", e.target.value)}
              />
            </label>
            <div>
              <button onClick={handleSubmitChangeDate}>שלח</button>
              <button onClick={() => setChangeTreatmentDate(false)&&setTreatmentId(null)}>
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
      
      {cancelTreatment && (

<h2>ביטול טיפול</h2>
)}
{!treatmentDocumentation&&(
<h2>תיעוד טיפול</h2>
)}
    </div>
  )
}

export default ActiveSeriesOfTreatments;
