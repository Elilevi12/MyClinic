import { useState } from "react";
import './css/addTherapist.css';

function AddTherapist() {
  const [therapist, setTherapist] = useState({
    license_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    specialty: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTherapist((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    fetch("http://localhost:3300/admin/addTherapist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(therapist)
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="add-therapist-container">
      <h3>הוסף מטפל חדש</h3>
      <input
        type="number"
        name="license_number"
        value={therapist.license_number}
        placeholder="מספר רישיון"
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="first_name"
        value={therapist.first_name}
        placeholder="שם פרטי"
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="last_name"
        value={therapist.last_name}
        placeholder="שם משפחה"
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="email"
        name="email"
        value={therapist.email}
        placeholder="אימייל"
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="tel"
        name="phone"
        value={therapist.phone}
        placeholder="טלפון"
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="specialty"
        value={therapist.specialty}
        placeholder="תחום טיפול"
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="address"
        value={therapist.address}
        placeholder="כתובת"
        onChange={handleChange}
        className="input-field"
      />
      <button onClick={handleSubmit} className="submit-button">הוסף מטפל</button>
    </div>
  );
}

export default AddTherapist;
