import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/treatmentSeriesInitiator.module.css";

function TreatmentSeriesInitiator() {
  const therapist = JSON.parse(localStorage.getItem("currentUser"));
  const patient = JSON.parse(localStorage.getItem("selectedPatient"));

  const [treatmentSeries, setTreatmentSeries] = useState({
    patientId: patient.patientId,
    therapistId: therapist.id,
    total_treatments: 0,
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatmentSeries((series) => ({
      ...series,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/therapist/activSeries/addTreatmentSession",

        {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
           },
          body: JSON.stringify(treatmentSeries),
        }
      );

      if (response.ok) {
        alert("הפרטים נשמרו בהצלחה");
      } else {
        alert("שגיאה בשליחת הנתונים");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("שגיאה בשליחת הנתונים");
    }
  };

  return (
    <div className={styles.treatmentSeriesContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="number-of-treatments" className={styles.label}>
          מספר טיפולים
        </label>
        <input
          type="number"
          name="total_treatments"
          value={treatmentSeries.total_treatments}
          onChange={handleChange}
          id="treatment-number"
          className={styles.inputField}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="treatment-comments" className={styles.label}>
          הערות
        </label>
        <textarea
          id="treatment-comments"
          className={styles.textareaField}
          name="comments"
          value={treatmentSeries.comments}
          onChange={handleChange}
          placeholder="הכנס הערות"
          rows="3"
        />
      </div>

      <button onClick={handleSubmit} className={styles.submitButton}>
        שלח
      </button>
      <Link to="/therapist/personal-file">
        <button className={styles.cancelButton}>ביטול</button>
      </Link>
    </div>
  );
}

export default TreatmentSeriesInitiator;