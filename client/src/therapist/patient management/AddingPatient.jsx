import React, { useRef } from "react";

function AddingPatient() {
    
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const idNumberRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const birthDateRef = useRef();
  const appointmentDateRef = useRef();
  const healthCareProviderRef = useRef();
  const approvedSessionsRef = useRef();
  const sessionPriceRef = useRef();

  const handleSubmit = async () => {
    const patient = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      idNumber: idNumberRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      birthDate: birthDateRef.current.value,
      appointmentDate: appointmentDateRef.current.value,
      healthCareProvider: healthCareProviderRef.current.value,
      approvedSessions: approvedSessionsRef.current.value,
      sessionPrice: sessionPriceRef.current.value
    };

    try {
      const response = await fetch("http://localhost:3300/add-patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patient)
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
    <div>
      <input type="text" ref={firstNameRef} placeholder="שם פרטי" />
      <input type="text" ref={lastNameRef} placeholder="שם משפחה" />
      <input type="text" ref={idNumberRef} placeholder="תעודת זהות" />
      <input type="tel" ref={phoneRef} placeholder="טלפון" />
      <input type="email" ref={emailRef} placeholder="כתובת מייל" />
      <input type="date" ref={birthDateRef} placeholder="תאריך לידה" />
      <input type="text" ref={healthCareProviderRef} placeholder="קופת חולים" />
      <input type="number" ref={approvedSessionsRef} placeholder="מספר טיפולים מאושר" />
      <input type="number" ref={sessionPriceRef} placeholder="מחיר טיפול" />
      <input type="date" ref={appointmentDateRef} placeholder="תאריך פנייה" />
      <button onClick={handleSubmit}>שלח</button>
    </div>
  );
}

export default AddingPatient;
