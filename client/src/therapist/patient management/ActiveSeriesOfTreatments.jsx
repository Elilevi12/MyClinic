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
  const [documentationText, setDocumentationText] = useState("");
const [cancelnText, setCancelnText] = useState("");
const [serialID, setSerialID] = useState(null);

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
        setSerialID(data[0].treatment_series_id);
        console.log(data);
        
      })
      .catch((error) => {
        console.error("Error fetching Active Series of Treatments:", error);
      });


  }, []);

  const handleModalChange = (field, value) => {
    setModalData((prev) => ({ ...prev, [field]: value }));
  };

  function handleSubmitChangeDate() {

    fetch(
      "http://localhost:3300/therapist/treatmentDiary/changeTreatmentDate",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          treatmentId: treatmentId,
          date: modalData.date,
          time: modalData.time,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setChangeTreatmentDate(false);
      })
      .catch((error) => {
        alert("שגיאה בשליחת הנתונים");
      });
    setTreatmentId(null);
    setChangeTreatmentDate(false);
  }

  function handleSubmitDocumentation() {
    fetch("http://localhost:3300/therapist/treatmentDiary/documentation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentation: documentationText,
        treatmentId: treatmentId,
        serialID: serialID,
        userId: patient.patientId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        alert("שגיאה בשליחת הנתונים");
      });
  
    setTreatmentDocumentation(false);
    setDocumentationText("");
    setTreatmentId(null);
  }
  


function handleSubmitCanceln() {
console.log(cancelnText);
console.log(treatmentId);
console.log(serialID);

setCancelTreatment(false);
setTreatmentId(null);
setCancelnText("");
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
              <button
                onClick={() =>
                  setChangeTreatmentDate(false) && setTreatmentId(null)
                }
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
     
      {cancelTreatment &&  
      <div className="modal-backdrop">
          <div className="modal">
            <h2>ביטול טיפול</h2>
            <textarea
              value={cancelnText}
              onChange={(e) => setCancelnText(e.target.value)}
              placeholder="הזן סיבת ביטול..."
            />
            <div>
              <button onClick={handleSubmitCanceln}>שלח</button>
              <button
                onClick={() => {
                  setCancelTreatment(false);
                  setCancelnText("");
                }}
              >
                ביטול
              </button>
            </div>
          </div>
        </div>}
    
      {treatmentDocumentation && ( 
        <div className="modal-backdrop">
          <div className="modal">
            <h2>תיעוד טיפול</h2>
            <textarea
              value={documentationText}
              onChange={(e) => setDocumentationText(e.target.value)}
              placeholder="הזן תיעוד..."
            />
            <div>
              <button onClick={handleSubmitDocumentation}>שלח</button>
              <button
                onClick={() => {
                  setTreatmentDocumentation(false);
                  setDocumentationText("");
                }}
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ActiveSeriesOfTreatments;
