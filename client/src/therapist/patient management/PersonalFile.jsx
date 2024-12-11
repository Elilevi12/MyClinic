import React, { useState, useEffect } from "react";
import ActiveSeriesOfTreatments from "./Activetreatment";
import { Link } from "react-router-dom";

import styles from "../css/personalFile.module.css";

function PersonalFile() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [treatmentSeries, setTreatmentSeries] = useState([]);

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("selectedPatient"));
    setSelectedPatient(patient);
    const therapist = JSON.parse(localStorage.getItem("selectedTherapist"));
  }, []);

  if (!selectedPatient) {
    return <p className={styles.noPatient}>אנא בחר מטופל</p>;
  }

  return (
    <div className={styles.personalFileActions}>
      <h2 className={styles.title}>תיק אישי</h2>
      <h1 className={styles.patientDetails}>{selectedPatient.name}</h1>
      
      <div className={styles.personalFileContainer}>
        <Link to="update-patient" className={styles.link}>
          <button className={styles.button}>עדכון פרטים אישיים</button>
        </Link>
        <Link to="treatment-series" className={styles.link}>
          <button className={styles.button}>סדרת טיפולים נוספת</button>
        </Link>
        <Link to="history" className={styles.link}>
          <button className={styles.button}>היסטוריה</button>
        </Link>
      </div>
      
      <div className={styles.activeTreatmentSection}>
        <ActiveSeriesOfTreatments />
      </div>
    </div>
  );
};

export default PersonalFile;
