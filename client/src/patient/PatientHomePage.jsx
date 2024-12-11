import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./patientHomePage.module.css"; // ייבוא קובץ ה-CSS מודול

function PatientHomePage() {
  const patient = JSON.parse(localStorage.getItem("currentUser"));
  console.log("patient", patient);

  const [treatments, setTreatments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const fetchTreatments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/patients/getPatientTreatments/${patient.id}`
      );
      if (!response.ok) {
        throw new Error("\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D1\u05DC\u05EA \u05E4\u05E8\u05D8\u05D9 \u05D4\u05D8\u05D9\u05E4\u05D5\u05DC\u05D9\u05DD");
      }
      const data = await response.json();
      setTreatments(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/patients/getPatient/${patient.id}`
      );
      if (!response.ok) {
        throw new Error("\u05E9\u05D2\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D1\u05DC\u05EA \u05E4\u05E8\u05D8\u05D9 \u05D4\u05D7\u05D5\u05D1\u05D5\u05EA");
      }
      const data = await response.json();
      setCurrentUser(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTreatments();
    fetchCurrentUser();
  }, []);

  return (
    <div className={styles.container}>
   
   
      <div className={styles.header}>
        <h1>ברוך הבא {currentUser.first_name}</h1>
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>מצב חשבון</h2>
        {currentUser.debts - currentUser.Payments > 0 ? (
          <h3 className={styles.debt}>יתרת חוב: {currentUser.debts - currentUser.Payments}</h3>
        ) : (
          <h3 className={styles.credit}>יתרת זכות: {currentUser.Payments - currentUser.debts}</h3>
        )}
      </div>
      <div className={styles.section}>
        <h2 className={styles.title}>טיפולים קרובים</h2>
        {treatments.map((treatment, index) => (
          <div key={index} className={styles.treatmentCard}>
            <h3>תאריך: {new Date(treatment.treatment_date).toLocaleDateString()}</h3>
            <h3>שעה: {treatment.treatment_time}</h3>
          </div>
        ))}
      </div>

   
    </div>
  );
}

export default PatientHomePage;
