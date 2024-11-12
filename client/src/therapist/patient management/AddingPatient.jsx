import React, { useState } from "react";
import "../css/addingPatient.css";

function AddingPatient() {
  const [patient, setPatient] = useState({
    therapist_id: 10,
    first_name: "",
    last_name: "",
    id_number: "",
    phone: "",
    email: "",
    birth_date: "",
    healthcare_provider: "",
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
      const response = await fetch("http://localhost:3300/therapist/addPatient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient),
      });

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
    <div className="container">
      <h2>הוסף מטופל חדש</h2>
      <label className="label">שם פרטי</label>
      <input
        type="text"
        name="first_name"
        value={patient.first_name}
        onChange={handleChange}
        className="input"
        placeholder="הכנס שם פרטי"
      />
      
      <label className="label">שם משפחה</label>
      <input
        type="text"
        name="last_name"
        value={patient.last_name}
        onChange={handleChange}
        className="input"
        placeholder="הכנס שם משפחה"
      />
      
      <label className="label">תעודת זהות</label>
      <input
        type="text"
        name="id_number"
        value={patient.id_number}
        onChange={handleChange}
        className="input"
        placeholder="הכנס תעודת זהות"
      />
      
      <label className="label">טלפון</label>
      <input
        type="tel"
        name="phone"
        value={patient.phone}
        onChange={handleChange}
        className="input"
        placeholder="הכנס מספר טלפון"
      />
      
      <label className="label">כתובת מייל</label>
      <input
        type="email"
        name="email"
        value={patient.email}
        onChange={handleChange}
        className="input"
        placeholder="הכנס כתובת מייל"
      />
      
      <label className="label">תאריך לידה</label>
      <input
        type="date"
        name="birth_date"
        value={patient.birth_date}
        onChange={handleChange}
        className="input"
      />
      
      <label className="label">קופת חולים</label>
      <input
        type="text"
        name="healthcare_provider"
        value={patient.healthcare_provider}
        onChange={handleChange}
        className="input"
        placeholder="הכנס קופת חולים"
      />
      
      <button onClick={handleSubmit} className="button">שלח</button>
    </div>
  );
}

export default AddingPatient;
