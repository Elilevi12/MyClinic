import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PersonalFilePatient() {
  const [showPersonalFile, setShowPersonalFile] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedPatientID, setSelectedPatientID] = useState(null);


  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(
        "http://localhost:3300/therapist/ListOfPatients",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ therapist_id: 1 }),
        }
      );
      const data = await response.json();
      setPatients(data);
      console.log(data);
    };

    fetchPatients();
  }, []);
  console.log(patients);
  
  console.log(patients.length);
  const handlePatientSelect = (patient) => {
    setSelectedPatientName(`${patient.first_name} ${patient.last_name}`);
    setSelectedPatientID(patient.user_id);
    setShowPersonalFile(true);
  };

  return (
    <div>
     

      {!showPersonalFile && 
      <>
         {/* <button onClick={() => setShowPersonalFile(!showPersonalFile)}>
        קובץ אישי
      </button> */}
      {/* <input
        type="text"
        placeholder="שם מטופל"
        value={selectedPatientName}
        readOnly
      />
       */}
      {patients.message === "לא נמצאו מטופלים"? <p>אין מטופלים</p>:
      <table
      border="1"
      style={{
        borderCollapse: "collapse",
        width: "50%",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
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
        { patients.map((patient, index) => (
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
      
      }
      
      </>

      }

      {showPersonalFile && (
        <>
<h1>{selectedPatientName}</h1>
<h2>{selectedPatientID}</h2>
          <button>מטרות</button>
          <button>תיעוד טיפול</button>
          <Link to="update-patient">
            <button>עדכון פרטים אישיים</button>
          </Link>
          <Link 
  to={{
    pathname: "treatment-series",
    state: { patientName: selectedPatientName, patientID: selectedPatientID }
  }}
>
  <button>קביעת סדרת טיפולים</button>

  
</Link>

          <button>אבחון</button>
          <button>דוח סיכום</button>
          <button>העלאת מסמכים לתיקים אישיים</button>
        </>
      )}
    </div>
  );
}

export default PersonalFilePatient;
