import React, { useState, useEffect } from "react";
import "../css/waitingList.css";

function WaitingList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ date: "", time: "", goals: [], price: "" });
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const therapist = JSON.parse(localStorage.getItem("selectedTherapist"));

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("http://localhost:3300/therapist/waitingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ therapist_id: therapist.therapistId }),
      });
      const data = await response.json();
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
          },
          body: JSON.stringify({
            treatment_series_id: selectedPatientId,
            therapist_id: 1,
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
    <div>
      <h1>Waiting List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table
          border="1"
          style={{
            borderCollapse: "collapse",
            width: "50%",
            textAlign: "center",
          }}
        >
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
        <div className="modal-backdrop">
          <div className="modal">
            <h2>פרטי סדרת טיפולים</h2>
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
            <label>
              מחיר:
              <input
                type="number"
                value={modalData.price}
                onChange={(e) => handleModalChange("price", e.target.value)}
              />
            </label>
            <label>
              מטרות הסדרה:
              {modalData.goals.map((goal, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => handleModalChange("goals", e.target.value, index)}
                  />
                </div>
              ))}
              <button onClick={() => handleModalChange("goals")}>הוסף מטרה</button>
            </label>
            <div>
              <button onClick={handleSubmit}>שלח</button>
              <button onClick={() => setIsModalOpen(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WaitingList;
