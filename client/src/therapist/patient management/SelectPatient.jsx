import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/selectPatient.module.css"; // ייבוא קובץ ה-CSS המודול

function SelectPatient() {
  const navigate = useNavigate();
  const therapist = JSON.parse(localStorage.getItem("currentUser"));

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "http://localhost:3300/therapist/ListOfPatients",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
  
        const data = await response.json();
  
        if (data.message === "לא נמצאו מטופלים") {
          setPatients([]);
        } else {
          setPatients(data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        setPatients([]);
      }
    };
  
    fetchPatients();
  }, []);
  const handlePatientSelect = (patient) => {
    const selectedPatient = {
      name: `${patient.first_name} ${patient.last_name}`,
      patientId: patient.user_id,
    };

    localStorage.setItem("selectedPatient", JSON.stringify(selectedPatient));
    navigate("/therapist/personal-file", { state: { patient: patient } });
  };

  return (
    <div className={styles.personalFileContainer}>
      <h1 className={styles.h1}>בחירת מטופל</h1>
      {patients.length === 0 ? (
        <p className={styles.noPatientsMessage}>
          {patients.length === 0 ? "לא נמצאו מטופלים" : "אין מטופלים"}
        </p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>#</th>
              <th className={styles.tableHeader}>שם פרטי</th>
              <th className={styles.tableHeader}>שם משפחה</th>
              <th className={styles.tableHeader}>תעודת זהות</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.user_id}
                onClick={() => handlePatientSelect(patient)}
                className={styles.tableRow}
              >
                <td>{index + 1}</td>
                <td>{patient.first_name}</td>
                <td>{patient.last_name}</td>
                <td>{patient.id_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
  
};

export default SelectPatient;