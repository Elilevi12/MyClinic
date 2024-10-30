import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

function Calendar() {
  const [display, setDisplay] = useState("dayGridMonth");
  const handleDisplayChange = (view) => {
    setDisplay(view);
  };

  return (
    <div className="calendar-container">
      <button onClick={() => handleDisplayChange("timeGridDay")}>
        תצוגת יום
      </button>
      <button onClick={() => handleDisplayChange("timeGridWeek")}>
        תצוגת שבוע
      </button>
      <button onClick={() => handleDisplayChange("dayGridMonth")}>
        תצוגת חודש
      </button>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={display}
        key={display} 
      />

      <button>הוסף חופשה</button>
    </div>
  );
}

export default Calendar;
