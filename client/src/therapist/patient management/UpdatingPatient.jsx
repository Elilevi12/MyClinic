import React, { useState } from "react";

function UpdatingPatient() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    idNumber: "",
    phone: "",
    email: "",
    birthDate: "",
    healthCare: "",
    approvedTreatments: 0,
    price: 0,
  });

  const [editField, setEditField] = useState(null);

  // מיפוי שמות השדות לעברית
  const fieldLabels = {
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    idNumber: "תעודת זהות",
    phone: "טלפון",
    email: "כתובת מייל",
    birthDate: "תאריך לידה",
 healthCare: "קופת חולים",
    approvedTreatments: "מספר טיפולים מאושר",
    price: "מחיר",
  };

  const handleFieldChange = (field, value) => {
    setFields({ ...fields, [field]: value });
  };

  const handleEditClick = (field) => {
    setEditField(field);
  };

  return (
    <div>
      {Object.keys(fields).map((field) => (
        <div key={field}>
          <label>{fieldLabels[field]}:</label>
          <span>{fields[field]}</span>
          <button onClick={() => handleEditClick(field)}>ערוך</button>
          {editField === field && (
            <input
              type={field === "approvedTreatments" ? "number" : "text"}
              value={fields[field]}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              placeholder={`עדכן ${fieldLabels[field]}`}
            />
          )}
        </div>
      ))}
      <button onClick={() => console.log(fields)}>שלח</button>
    </div>
  );
}

export default UpdatingPatient;
