import { useState } from "react";
import Calendar from "../shared/Calendar";
import AddTherapist from "./AddTherapist";
function AdminHomePage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddTherapist, setShowAddTherapist] = useState(false);

  function addTherapist() {
    setShowAddTherapist((showAddTherapist) => !showAddTherapist);
    setShowCalendar(false);
  }

  function openCalendar() {
    setShowCalendar((showCalendar) => !showCalendar);
    setShowAddTherapist(false);
  }
  return (
    <div>
      <h1>AdminHomePage....</h1>
      <button onClick={addTherapist}>הוסף מטפלים</button>
      <button onClick={openCalendar}>לוח שנה</button>
      <button>רשימת מטפלים</button>
      {showCalendar && <Calendar userType="admin" />}
      {showAddTherapist && <AddTherapist />}
    </div>
  );
}
export default AdminHomePage;
