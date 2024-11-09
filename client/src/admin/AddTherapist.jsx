import { useState } from "react";

function AddTherapist() {
  const [therapist, setTherapist] = useState({
    license_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    specialty: "",
  }
);

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
        name="phone"
        placeholder="טלפון"
        onChange={handleChange}
      />
      <input
        type="text"
        name="specialty"
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
