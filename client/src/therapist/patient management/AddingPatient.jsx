import React, { useState } from "react";
import styles from "../css/addingPatient.module.css";

function AddingPatient() {
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

  const [errors, setErrors] = useState({}); // שמירה על שגיאות לכל שדה

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));

    // הסרת שגיאה בזמן שהמשתמש מתקן שדה
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!patient.first_name.trim()) newErrors.first_name = "יש למלא שם פרטי";
    if (!patient.last_name.trim()) newErrors.last_name = "יש למלא שם משפחה";
    if (!patient.id_number.trim()) newErrors.id_number = "יש למלא תעודת זהות";
    if (!patient.phone.trim()) newErrors.phone = "יש למלא מספר טלפון";
    if (!patient.email.trim()) newErrors.email = "יש למלא כתובת מייל";
    if (!patient.birth_date.trim()) newErrors.birth_date = "יש למלא תאריך לידה";
    if (!patient.healthcare_provider.trim())
      newErrors.healthcare_provider = "יש למלא קופת חולים";
    if (patient.total_treatments <= 0)
      newErrors.total_treatments = "יש למלא מספר טיפולים מאושר";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // מחזיר true אם אין שגיאות
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("יש לתקן את השגיאות בטופס");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3300/therapist/addPatient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(patient),
        }
      );

      if (response.ok) {
        alert("הנתונים נשלחו בהצלחה!");
        window.location.reload();
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
      {errors.first_name && <p className={styles.error}>{errors.first_name}</p>}

      <label className={styles.label}>שם משפחה</label>
      <input
        type="text"
        name="last_name"
        value={patient.last_name}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס שם משפחה"
      />
      {errors.last_name && <p className={styles.error}>{errors.last_name}</p>}

      <label className={styles.label}>תעודת זהות</label>
      <input
        type="text"
        name="id_number"
        value={patient.id_number}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס תעודת זהות"
      />
      {errors.id_number && <p className={styles.error}>{errors.id_number}</p>}

      <label className={styles.label}>טלפון</label>
      <input
        type="tel"
        name="phone"
        value={patient.phone}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס מספר טלפון"
      />
      {errors.phone && <p className={styles.error}>{errors.phone}</p>}

      <label className={styles.label}>כתובת מייל</label>
      <input
        type="email"
        name="email"
        value={patient.email}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס כתובת מייל"
      />
      {errors.email && <p className={styles.error}>{errors.email}</p>}

      <label className={styles.label}>תאריך לידה</label>
      <input
        type="date"
        name="birth_date"
        value={patient.birth_date}
        onChange={handleChange}
        className={styles.input}
      />
      {errors.birth_date && <p className={styles.error}>{errors.birth_date}</p>}

      <label className={styles.label}>קופת חולים</label>
      <input
        type="text"
        name="healthcare_provider"
        value={patient.healthcare_provider}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס קופת חולים"
      />
      {errors.healthcare_provider && (
        <p className={styles.error}>{errors.healthcare_provider}</p>
      )}

      <label className={styles.label}>מספר טיפולים מאושר</label>
      <input
        type="number"
        name="total_treatments"
        value={patient.total_treatments}
        onChange={handleChange}
        className={styles.input}
        placeholder="הכנס מספר טיפולים מאושר"
      />
      {errors.total_treatments && (
        <p className={styles.error}>{errors.total_treatments}</p>
      )}

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
}

export default AddingPatient;
