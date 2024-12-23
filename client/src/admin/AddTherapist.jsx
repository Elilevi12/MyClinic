import { useState, useEffect } from "react";
import styles from './css/addTherapist.module.css';

function AddTherapist() {
  const [therapists, setTherapists] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [therapist, setTherapist] = useState({
    license_number: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    specialty: "",
  });

  // Fetch the list of therapists
  useEffect(() => {

    const token = localStorage.getItem("token");
console.log(token);


    fetch("http://localhost:3300/admin/getTherapists", {
        method: "GET",
        headers: {
            Authorization: token, // שליחת הטוקן בכותרת Authorization
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("שגיאה באימות הטוקן או בגישה לנתיב");
            }
            return response.json();
        })
        .then((data) => setTherapists(data))
        .catch((error) => console.error("שגיאה:", error));
}, []);


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
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(therapist)
    })
      .then((response) =>{response.json()
        console.log(response);
        
      }) 
      .then(() => {
        alert("המטפל נוסף בהצלחה");
        setShowForm(false);
      })      
  };

  return (
    <div className={styles.pageContainer}>
      <h3 className={styles.pageTitle}>ניהול מטפלים</h3>
      {showForm ? (
        <div className={styles.formContainer}>
          <h3>הוסף מטפל חדש</h3>
          <input
            type="number"
            name="license_number"
            value={therapist.license_number}
            placeholder="מספר רישיון"
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="first_name"
            value={therapist.first_name}
            placeholder="שם פרטי"
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="last_name"
            value={therapist.last_name}
            placeholder="שם משפחה"
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="email"
            name="email"
            value={therapist.email}
            placeholder="אימייל"
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="tel"
            name="phone"
            value={therapist.phone}
            placeholder="טלפון"
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="specialty"
            value={therapist.specialty}
            placeholder="תחום טיפול"
            onChange={handleChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="address"
            value={therapist.address}
            placeholder="כתובת"
            onChange={handleChange}
            className={styles.inputField}
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleSubmit} className={styles.submitButton}>
              שלח
            </button>
            <button onClick={() => setShowForm(false)} className={styles.cancelButton}>
              ביטול
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.listContainer}>
          <button
            onClick={() => setShowForm(true)}
            className={styles.addTherapistButton}
          >
            הוסף מטפל
          </button>
        
        </div>
      )}
    </div>
  );
}

export default AddTherapist;
