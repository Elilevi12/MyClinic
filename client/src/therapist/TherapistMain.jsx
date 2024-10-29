import { useState } from "react";
import Calendar from "../shared/Calendar";
function TherapistMain() {
  const [showCalendar, setShowCalendar] = useState(false);
  function openCalendar() {
    setShowCalendar((showCalendar) => !showCalendar);
  }
  return (
    <div>
      <h1>TherapistMain ..</h1>
      <button onClick={openCalendar}>לוח שנה</button>
      <button>הוספת לקוח</button>
      <button>רשימת חובות</button>
      <button>רשימת המתנה</button>
      <button>תיעוד טיפול</button>
      <button>כתיבת דוחות</button>
      {showCalendar && <Calendar />}
    </div>
  );
}
export default TherapistMain;
