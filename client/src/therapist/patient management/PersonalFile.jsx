import React, { useState, useEffect } from "react";
import ActiveSeriesOfTreatments from "./ActiveSeriesOfTreatments";
import { Link, useLocation } from "react-router-dom";
import "../css/personalFilePatient.css";

function PersonalFile() {
  const [selectedPatient, setSelectedPatient] = useState(null);
const [treatmentSeries, setTreatmentSeries] = useState([])
// const location = useLocation();
// const { patient } = location.state || {};



  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("selectedPatient"));
    setSelectedPatient(patient);
  const therapist= JSON.parse(localStorage.getItem("selectedTherapist"))

}, []);


  if (!selectedPatient) {
    return <p>אנא בחר מטופל</p>;
  }

  return (
    <div className="personal-file-actions">
      <h1 className="patient-details">{selectedPatient.name}</h1>
      <h2 className="patient-details">{selectedPatient.id}</h2>

      <button>היסטוריה</button>
      <Link to="update-patient">
        <button>עדכון פרטים אישיים</button>
      </Link>
      <Link to="treatment-series">
        <button> סדרת טיפולים נוספת</button>
      </Link>
   

<ActiveSeriesOfTreatments/>
    </div>
  );
}

export default PersonalFile;
