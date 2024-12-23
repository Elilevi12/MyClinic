import React, { useEffect, useState } from "react";
import styles from "../css/activetreatment.module.css";
import ActiveSeries from "./ActivSeries";

function Activetreatment() {
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
  const therapist = JSON.parse(localStorage.getItem("currentUser"));
const fetchTreatmentSeries = async () => {

  fetch(
    "http://localhost:3300/therapist/personalFilePatient/ActiveSeriesOfTreatments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        patientId: patient.patientId,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      setTreatments(data);
      setSerialID(data[0].treatment_series_id);
    })
    .catch((error) => {
      console.error("Error fetching Active Series of Treatments:", error);
    });
}

  const translateStatus = (status) => {
    switch (status) {
      case "on hold":
        return "בהמתנה";
      case "cancellation":
        return "בוטל";
      case "done":
        return "בוצע";
      default:
        return "לא ידוע"; // במקרה של ערך שלא זוהה
    }
  };
  useEffect(() => {
    fetchTreatmentSeries();
  }
  , []);

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
          Authorization: localStorage.getItem("token"),
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
    fetchTreatmentSeries();
  }

  function handleSubmitDocumentation() {
    fetch("http://localhost:3300/therapist/treatmentDiary/documentation", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
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
    fetchTreatmentSeries();
  }

  function handleSubmitCanceln() {
    console.log(serialID);
console.log(treatmentId);

    fetch("http://localhost:3300/therapist/treatmentDiary/cancelTreatment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        treatmentId: treatmentId,
        serialID: serialID,
        cancelnText: cancelnText,
      
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setCancelTreatment(false);
      })
      .catch((error) => {
        alert("שגיאה בשליחת הנתונים");
      });

    setTreatmentId(null);
    setCancelnText("");
    fetchTreatmentSeries();
  }

  const openDocumentationModal = (treatmentId) => {
    setTreatmentId(treatmentId);
    setTreatmentDocumentation(true);
  };

  const openCancelModal = (treatmentId) => {
    setTreatmentId(treatmentId);
   console.log(treatmentId);
   
    
    setCancelTreatment(true);
  };

  const openDateChangeModal = (treatmentId) => {
    setTreatmentId(treatmentId);
    setChangeTreatmentDate(true);
  };


  return (
    <div className={styles.treatmentsContainer}>
      <div className={styles.activeSeriesBox}>
        <ActiveSeries serialID={serialID} />
      </div>
      {treatmentSeries.length > 0 && (
        <div className={styles.treatmentsGoalsBox}>
          <h2 className={styles.treatmentsGoalsTitle}>מטרות</h2>
          <p>{treatmentSeries[0].goals}</p>
        </div>
      )}
      {treatments.length > 0 ? (
        <div className={styles.treatmentsTableContainer}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>תאריך</th>
                <th>טיפולים</th>
                <th>סטטוס</th>
              </tr>
            </thead>
            <tbody>
              {treatments.map((treatment, index) => (
                <tr key={treatment.id}>
                  <td>{index + 1}</td>
                  <td>
                    {new Date(treatment.treatment_date).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className={styles.treatmentsButtonDoc}
                      onClick={() => openDocumentationModal(treatment.id)}
                    >
                      תיעוד טיפול
                    </button>
                    <button
                      className={styles.treatmentsButtonCancel}
                      onClick={() => openCancelModal(treatment.id)}
                    >
                      ביטול
                    </button>
                    <button
                      className={styles.treatmentsButtonChange}
                      onClick={() => openDateChangeModal(treatment.id)}
                    >
                      שינוי תאריך
                    </button>
                  </td>
                  <td>{translateStatus(treatment.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.treatmentsNoTreatments}>
          לא נמצאו טיפולים פעילים.
        </p>
      )}
      {changeTreatmentDate && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
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
      {cancelTreatment && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
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
        </div>
      )}
      {treatmentDocumentation && (
  <div className={styles.modalBackdrop}>
    <div className={`${styles.modal} ${styles['treatment-documentation']}`}>
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
};

export default Activetreatment;