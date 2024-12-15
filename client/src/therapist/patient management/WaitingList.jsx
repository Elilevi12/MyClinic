import React, { useState, useEffect } from "react";
import  styles from "../css/waitingList.module.css";

function WaitingList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ date: "", time: "", goals: [], price: "" });
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const therapist = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:3300/therapist/waitingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),          
        },
      });
      const data = await response.json();
      console.log("המטופלים ברשימת ההמתנה:", data);
      
      setPatients(data);
      setLoading(false);
    };

    fetchPatients();
  }, []);

  const handleModalChange = (field, value, index = null) => {
    if (field === "goals") {
      setModalData((prev) => {
        const updatedGoals = [...prev.goals];
        if (index !== null) {
          updatedGoals[index] = value;
        } else {
          updatedGoals.push("");
        }
        return { ...prev, goals: updatedGoals };
      });
    } else {
      setModalData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    console.log("פרטי הטיפול:", modalData);
    
    try {
      const response = await fetch(
        "http://localhost:3300/therapist/treatmentDiary/creatingAseriesOfTreatments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            treatment_series_id: selectedPatientId,
            start_date: modalData.date,
            treatmentTime: modalData.time,
            goals: modalData.goals,
            price: modalData.price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("שגיאה בביצוע הבקשה");
      }

      const data = await response.json();
      console.log("סדרת הטיפולים התחילה בהצלחה:", data);
      setIsModalOpen(false); // סגירת החלונית
    } catch (error) {
      console.error("שגיאה במהלך התחלת סדרת טיפולים:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>רשימת המתנה</h1>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>שם פרטי</th>
              <th>שם משפחה</th>
              <th>טלפון</th>
              <th>אימייל</th>
              <th>תאריך לידה</th>
              <th>מספר טיפולים מאושר</th>
              <th>הערות</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td>{index + 1}</td>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.phone}</td>
                <td>{patient.email}</td>
                <td>{new Date(patient.birth_date).toISOString().split("T")[0]}</td>
                <td>{patient.total_treatments}</td>
                <td>{patient.comments}</td>
                <td>
                  <button
                    className={styles.startButton}
                    onClick={() => {
                      setSelectedPatientId(patient.id);
                      setIsModalOpen(true);
                    }}
                  >
                    התחל סדרה
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2 className={styles.modalHeader}>פרטי סדרת טיפולים</h2>
            <label className={styles.modalLabel}>
              תאריך:
              <input
                className={styles.modalInput}
                type="date"
                value={modalData.date}
                onChange={(e) => handleModalChange("date", e.target.value)}
              />
            </label>
            <label className={styles.modalLabel}>
              שעה:
              <input
                className={styles.modalInput}
                type="time"
                value={modalData.time}
                onChange={(e) => handleModalChange("time", e.target.value)}
              />
            </label>
            <label className={styles.modalLabel}>
              מחיר:
              <input
                className={styles.modalInput}
                type="number"
                value={modalData.price}
                onChange={(e) => handleModalChange("price", e.target.value)}
              />
            </label>
            <label className={styles.modalLabel}>
              מטרות הסדרה:
              {modalData.goals.map((goal, index) => (
                <div key={index}>
                  <input
                    className={styles.modalInput}
                    type="text"
                    value={goal}
                    onChange={(e) => handleModalChange("goals", e.target.value, index)}
                  />
                </div>
              ))}
              <button
                className={styles.addGoalButton}
                onClick={() => handleModalChange("goals", "")}
              >
                הוסף מטרה
              </button>
            </label>
            <div className={styles.modalActions}>
              <button className={styles.submitButton} onClick={handleSubmit}>
                שלח
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsModalOpen(false)}
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

export default WaitingList;