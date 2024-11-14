import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/personalFilePatient.css";

function PersonalFilePatient() {
  const [showPersonalFile, setShowPersonalFile] = useState(false);
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedPatientID, setSelectedPatientID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(
        "http://localhost:3300/therapist/ListOfPatients",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ therapist_id: 1 }),
        }
      );
      const data = await response.json();
      setPatients(data);
      setFilteredPatients(data); // אתחל את רשימת המטופלים המסוננת עם כל המטופלים
      console.log(data);
    };

    fetchPatients();
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatientName(`${patient.first_name} ${patient.last_name}`);
    setSelectedPatientID(patient.user_id);
    setShowPersonalFile(true);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // סינון לפי שם פרטי או שם משפחה
    const filtered = patients.filter((patient) => 
      patient.first_name.toLowerCase().includes(value) || 
      patient.last_name.toLowerCase().includes(value)
    );
    setFilteredPatients(filtered);
  };

  return (
    <div className="personal-file-container">
      {!showPersonalFile ? (
        <>
          <input
            type="text"
            placeholder="חפש לפי שם פרטי או משפחה"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {filteredPatients.length === 0 ? (
            <p className="no-patients-message">אין מטופלים</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>שם פרטי</th>
                  <th>שם משפחה</th>
                  <th>תעודת זהות</th>
                  <th>מספר מטופל</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr
                    key={patient.user_id}
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <td>{index + 1}</td>
                    <td>{patient.first_name}</td>
                    <td>{patient.last_name}</td>
                    <td>{patient.id_number}</td>
                    <td>{patient.user_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      ) : (
        <div className="personal-file-actions">
          <h1 className="patient-details">{selectedPatientName}</h1>
          <h2 className="patient-details">{selectedPatientID}</h2>
          <button>מטרות</button>
          <button>תיעוד טיפול</button>
          <Link to="update-patient">
            <button>עדכון פרטים אישיים</button>
          </Link>
          <Link to="treatment-series">
     
            <button>קביעת סדרת טיפולים</button>
          </Link>
          <button>אבחון</button>
          <button>דוח סיכום</button>
          <button>העלאת מסמכים לתיקים אישיים</button>
        </div>
      )}
    </div>
  );
}

export default PersonalFilePatient;
