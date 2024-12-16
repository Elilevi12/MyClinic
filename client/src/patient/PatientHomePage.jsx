import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./patientHomePage.module.css"; // ייבוא קובץ ה-CSS מודול

function PatientHomePage() {

  const [treatments, setTreatments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const handleLogout = () => {
    localStorage.removeItem("token");
   
  };

  const fetchTreatments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/patients/getPatientTreatments`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        },
      );
      if (!response.ok) {
        throw new Error("there was a problem fetching the treatments");
      }
      const data = await response.json();
      setTreatments(data);
    
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCurrentUser = async () => { 
    try {
      const response = await fetch(
        `http://localhost:3300/patients/getPatient`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"), 
          }
        },
      );
      if (!response.ok) {
        throw new Error("there was a problem fetching the user");
      }
      const data = await response.json();
      setCurrentUser(data);
      console.log(data.debts);
      console.log(data.payments);
      
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
        {currentUser.debts - currentUser.payments > 0 ? (
          <h3 className={styles.debt}>יתרת חוב: {currentUser.debts - currentUser.payments}</h3>
        ) : (
          <h3 className={styles.credit}>יתרת זכות: {currentUser.payments - currentUser.debts}</h3>
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

            <div className={styles.divLogout} >
<Link to="/" onClick={handleLogout} className={styles.logout}>התנתקות</Link>
</div>
    </div>
      </div>
  
  );
}

export default PatientHomePage;
