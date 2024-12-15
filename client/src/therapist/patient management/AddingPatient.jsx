import React, { useState } from "react";
import styles from "../css/addingPatient.module.css";

function AddingPatient() {
  const therapist = JSON.parse(localStorage.getItem("currentUser"));
  const [patient, setPatient] = useState({

    first_name: "",
    last_name: "",
    id_number: "",
    phone: "",
    email: "",
    birth_date: "",
    healthcare_provider: "",
    total_treatments: 0,
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/therapist/addPatient",
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
           },
          body: JSON.stringify(patient),
        }
      );

      if (response.ok) {
        alert("הנתונים נשלחו בהצלחה!");
      } else {
        alert("שגיאה בשליחת הנתונים");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("שגיאה בשליחת הנתונים");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>הוסף מטופל חדש</h2>
      
      <label className={styles.label}>שם פרטי</label>
      <input
        type="text"
        name="first_name"
        value={patient.first_name}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס שם פרטי"
      />

      <label className={styles.label}>שם משפחה</label>
      <input
        type="text"
        name="last_name"
        value={patient.last_name}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס שם משפחה"
      />

      <label className={styles.label}>תעודת זהות</label>
      <input
        type="text"
        name="id_number"
        value={patient.id_number}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס תעודת זהות"
      />

      <label className={styles.label}>טלפון</label>
      <input
        type="tel"
        name="phone"
        value={patient.phone}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס מספר טלפון"
      />

      <label className={styles.label}>כתובת מייל</label>
      <input
        type="email"
        name="email"
        value={patient.email}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס כתובת מייל"
      />

      <label className={styles.label}>תאריך לידה</label>
      <input
        type="date"
        name="birth_date"
        value={patient.birth_date}
        onChange={handleChange}
        className={styles.input}
      />

      <label className={styles.label}>קופת חולים</label>
      <input
        type="text"
        name="healthcare_provider"
        value={patient.healthcare_provider}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס קופת חולים"
      />

      <label className={styles.label}>מספר טיפולים מאושר</label>
      <input
        type="number"
        name="total_treatments"
        value={patient.total_treatments}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס מספר טיפולים מאושר"
      />

      <label className={styles.label}>הערות</label>
      <textarea
        id="treatment-goals"
        name="comments"
        value={patient.comments}
        onChange={handleChange}
        className={styles.textareaField}
        placeholder="הערות"
        rows="5"
      />

      <button onClick={handleSubmit} className={styles.button}>
        שלח
      </button>
    </div>
  );
};

export default AddingPatient;