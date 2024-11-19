import React, { useState, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import "../css/personalFilePatient.css";

function PersonalFilePatient() {
 const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

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
    };

    fetchPatients();
  }, []);

  const handlePatientSelect = (patient) => {
    const selectedPatient = {
      name: `${patient.first_name} ${patient.last_name}`,
      patientId: patient.user_id,
    };
    
    localStorage.setItem("selectedPatient", JSON.stringify(selectedPatient));
   navigate("/therapist/personal-file");
  };

  return (
    <div className="personal-file-container">
          {patients.length === 0 ? (
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
                {patients.map((patient, index) => (
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
    </div>
  );
}
export default PersonalFilePatient;
