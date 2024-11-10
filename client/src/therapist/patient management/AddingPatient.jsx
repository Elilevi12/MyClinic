import React, { useState } from "react";

function AddingPatient() {
  const [patient, setPatient] = useState({
    therapist_id: 1,
    first_name: "",
    last_name: "",
    id_number: "",
    phone: "",
    email: "",
    birth_date: "",
    healthcare_provider: "",
  });

  const handleChange = (e) => {
    console.log(patient.birth_date);
    
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
          headers: { "Content-Type": "application/json" },
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
    <div>
      <input
        type="text"
        name="first_name"
        value={patient.first_name}
        onChange={handleChange}
        placeholder="שם פרטי"
      />
      <input
        type="text"
        name="last_name"
        value={patient.last_name}
        onChange={handleChange}
        placeholder="שם משפחה"
      />
      <input
        type="text"
        name="id_number"
        value={patient.id_number}
        onChange={handleChange}
        placeholder="תעודת זהות"
      />
      <input
        type="tel"
        name="phone"
        value={patient.phone}
        onChange={handleChange}
        placeholder="טלפון"
      />
      <input
        type="email"
        name="email"
        value={patient.email}
        onChange={handleChange}
        placeholder="כתובת מייל"
      />
      <input
        type="date"
        name="birth_date"
        value={patient.birth_date}
        onChange={handleChange}
        placeholder="תאריך לידה"
      />
      <input
        type="text"
        name="healthcare_provider"
        value={patient.healthcare_provider}
        onChange={handleChange}
        placeholder="קופת חולים"
      />
      <input
        type="number"
        name="approved_treatments"
        value={patient.approved_treatments}
        onChange={handleChange}
        placeholder="מספר טיפולים מאושר"
      />
      <button onClick={handleSubmit}>שלח</button>
    </div>
  );
}

export default AddingPatient;
