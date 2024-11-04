// import { useState } from "react"
// import AddingPatient from "./AddingPatient"
// import UpdatingPatient from "./UpdatingPatient"
// import TreatmentSeriesInitiator from "./TreatmentSeriesInitiator"
// function PatientManagement(){
// const [showAddPatient,setShowAddPatient]=useState(false)
// const [showUpdatingPatient,setShowUpdatingPatient]=useState(false)
// const [showTreatmentSeriesInitiator,setShowTreatmentSeriesInitiator]=useState(false)

// function openAddPatient(){
// setShowAddPatient(!showAddPatient)

// }
// function openUpdatingPatient(){
//     setShowUpdatingPatient(!showUpdatingPatient)

// }
// function openTreatmentSeriesInitiator(){
//     setShowTreatmentSeriesInitiator(!showTreatmentSeriesInitiator)
// }

// return (
//     <div>
// <button onClick={openAddPatient}>הוספת לקוח</button>
// <button onClick={openUpdatingPatient}>עדכון פרטי לקוח</button>
// <button onClick={openTreatmentSeriesInitiator}>ניהול יומן טיפולים</button>
// <button>העלאת מסמכים לתיקים אישיים</button>
// <button>רשימת המתנה</button>
// {showAddPatient&&<AddingPatient/>}
// {showUpdatingPatient&&<UpdatingPatient/>}
// {showTreatmentSeriesInitiator&&<TreatmentSeriesInitiator/>}
//     </div>
// )

// }export default PatientManagement

import { Link, Outlet } from "react-router-dom";

function PatientManagement() {
  return (
    <div>
      <nav>
        <Link to="add-patient">
          <button>הוספת לקוח</button>
        </Link>
        <Link to="update-patient">
          <button>עדכון פרטי לקוח</button>
        </Link>
        <Link to="treatment-series">
          <button>ניהול יומן טיפולים</button>
        </Link>
        <button>העלאת מסמכים לתיקים אישיים</button>
        <button>רשימת המתנה</button>
      </nav>

      {/* מציג את הרכיב המתאים בהתאם לנתיב */}
      <Outlet />
    </div>
  );
}

export default PatientManagement;
