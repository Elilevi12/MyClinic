import { useState } from "react";

function AddTherapist() {
  const [therapist, setTherapist] = useState({
    license_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    specialization: "",
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTherapist((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // תוכל להדפיס את האובייקט לקונסול או לשלוח אותו לשרת
    console.log(therapist);
    // אם צריך לשלוח לשרת אפשר להשתמש ב-API או לשלוח אותו למקום אחר
  };

  return (
    <div>
      <input
        type="number"
        name="license_number"
        placeholder="מספר רישיון"
        onChange={handleChange}
      />
      <input
        type="text"
        name="first_name"
        placeholder="שם פרטי"
    onChange={handleChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="שם משפחה"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="אימייל"
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone_number"
        placeholder="טלפון"
        onChange={handleChange}
      />
      <input
        type="text"
        name="specialization"
        placeholder="תחום טיפול"
    
        onChange={handleChange}
      />
      <input
        type="text"
    name="address"    
        placeholder="כתובת"
      
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>הוסף מטפל</button>
    </div>
  );
}

export default AddTherapist;
