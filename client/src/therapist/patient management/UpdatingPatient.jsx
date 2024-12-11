import React, { useState, useRef, useEffect } from "react";
import styles from "../css/updatingPatient.module.css";

function UpdatingPatient() {
  const patient = JSON.parse(localStorage.getItem("selectedPatient"));
  const therapist = JSON.parse(localStorage.getItem("currentUser"));

  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    phone: "",
    email: "",
    birthDate: "",
    healthCare: "",
  });

  const [editField, setEditField] = useState(null);
  const inputRef = useRef(null); // יצירת רפרנס לתיבת הקלט

  const fieldLabels = {
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    idNumber: "תעודת זהות",
    phone: "טלפון",
    email: "כתובת מייל",
    birthDate: "תאריך לידה",
    healthCare: "קופת חולים",
  };

  const handleFieldChange = (field, value) => {
    setFields({ ...fields, [field]: value });
  };

  const handleEditClick = (field) => {
    setEditField(field); 
  };

  useEffect(() => {
    if (editField && inputRef.current) {
      inputRef.current.focus(); 
    }
  }, [editField]);

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...fields,
        user_id: patient.patientId,
        therapist_id: therapist.userId,
      };
      console.log(dataToSend);

      const response = await fetch(
        "http://localhost:3300/therapist/personalFilePatient/updatePatient",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
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
    <div className={styles.updatingPatientContainer}>
      <h1 className={styles.title}>עדכון פרטי מטופל</h1>
      <div className={styles.fieldsContainer}>
        {Object.keys(fields).map((field) => (
          <div key={field} className={styles.fieldRow}>
            <label className={styles.fieldLabel}>{fieldLabels[field]}:</label>
            {editField === field ? (
              <input
                ref={inputRef}
                className={styles.fieldInput}
                type={field === "approvedTreatments" ? "number" : "text"}
                value={fields[field]}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                placeholder={`עדכן ${fieldLabels[field]}`}
              />
            ) : (
              <span className={styles.fieldValue}>
                {fields[field] || "לא הוזן"}
              </span>
            )}
            <button
              className={styles.editButton}
              onClick={() => handleEditClick(field)}
            >
              ערוך
            </button>
          </div>
        ))}
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>
        שלח
      </button>
    </div>
  );
}

export default UpdatingPatient;