// import { useState } from "react";
// import Calendar from "../shared/Calendar";
// import AddTherapist from "./AddTherapist";
// function AdminHomePage() {
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [showAddTherapist, setShowAddTherapist] = useState(false);

//   function addTherapist() {
//     setShowAddTherapist((showAddTherapist) => !showAddTherapist);
//     setShowCalendar(false);
//   }

//   function openCalendar() {
//     setShowCalendar((showCalendar) => !showCalendar);
//     setShowAddTherapist(false);
//   }
//   return (
//     <div>
//       <h1>AdminHomePage....</h1>
//       <button onClick={addTherapist}>הוסף מטפלים</button>
//       <button onClick={openCalendar}>לוח שנה</button>
//       <button>רשימת מטפלים</button>
//       {showCalendar && <Calendar userType="admin" />}
//       {showAddTherapist && <AddTherapist />}
//     </div>
//   );
// }
// export default AdminHomePage;
import { Link, Routes, Route } from 'react-router-dom';

function AdminHomePage() {
  return (
    <div>
      <h1>AdminHomePage....</h1>
      <nav>
        <Link to="add-therapist">
          <button>הוסף מטפלים</button>
        </Link>
        <Link to="calendar">
          <button>לוח שנה</button>
        </Link>
        <button>רשימת מטפלים</button>
      </nav>

    </div>
  );
}

export default AdminHomePage;
