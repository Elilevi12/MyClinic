// import { useState } from "react";
// import Calendar from "../shared/Calendar";
// import PatientManagement from "./patient management/PatientManagement"
// import MoneyManagement from "./Money Management/MoneyManagement"
// function TherapistHomePage() {

//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showPatientManagement,setShowPatientManagement]=useState(false) 
// const [showMoneyManagement,setShowMoneyManagement]=useState(false)

//   function openCalendar() {
//     setShowCalendar((showCalendar) => !showCalendar);
//   }

// function openMoneyManagement(){
//   setShowMoneyManagement((showMoneyManagement)=>!showMoneyManagement)

// }

//   function openPatientManagement(){
// setShowPatientManagement((showPatientManagement)=>!showPatientManagement)  
   
//   }
//   return (
//     <div>
   
//       <h1>TherapistMain ..</h1>
//       <button onClick={openCalendar}>לוח שנה</button>
//       <button onClick={openPatientManagement}>ניהול לקוחות</button>
//       <button onClick={openMoneyManagement}>ניהול כספים</button>
      
//       <button>תיעוד טיפול</button>
//       <button>כתיבת דוחות</button>
//       {showCalendar && <Calendar />}
//       {showPatientManagement&&<PatientManagement/>}
//       {showMoneyManagement&&<MoneyManagement/>}
//     </div>
//   );
// }
// export default TherapistHomePage;

import { Link, Outlet } from 'react-router-dom';

function TherapistHomePage() {
  return (
    <div>
      <h1>Therapist Main</h1>
      <nav>
        <Link to="calendar">
          <button>לוח שנה</button>
        </Link>
        <Link to="patient-management">
          <button>ניהול לקוחות</button>
        </Link>
        <Link to="money-management">
          <button>ניהול כספים</button>
        </Link>
        <button>תיעוד טיפול</button>
        <button>כתיבת דוחות</button>
      </nav>

      {/* מציג את הרכיב המתאים לפי הנתיב */}
      <Outlet />
    </div>
  );
}

export default TherapistHomePage;
