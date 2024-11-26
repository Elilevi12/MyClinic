import React, { useState, useRef, useEffect } from "react";
import "../css/updatingPatient.css";

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
    <div className="updating-patient-container">
      <h1>עדכון פרטי מטופל</h1>
      <div className="fields-container">
        {Object.keys(fields).map((field) => (
          <div key={field} className="field-row">
            <label className="field-label">{fieldLabels[field]}:</label>
            {editField === field ? (
              <input
                ref={inputRef} // הגדרת רפרנס לתיבת הקלט
                className="field-input"
                type={field === "approvedTreatments" ? "number" : "text"}
                value={fields[field]}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                placeholder={`עדכן ${fieldLabels[field]}`}
              />
            ) : (
              <span className="field-value">{fields[field] || "לא הוזן"}</span>
            )}
            <button
              className="edit-button"
              onClick={() => handleEditClick(field)}
            >
              ערוך
            </button>
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        שלח
      </button>
    </div>
  );
}

export default UpdatingPatient;
