import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from '@fullcalendar/rrule';
import "./Calendar.css";

function Calendar() {
  const [display, setDisplay] = useState("dayGridMonth");
  const[events,setEvents]=useState([])
  const handleDisplayChange = (view) => {
    setDisplay(view);
  };
 
const myEvents=[ {
    title:"חופש",
      start:"2024-11-10",
      end:"2024-11-13"
    },{ title:"חופש",
      start:"2024-11-25"}]

    

    myEvents.push({
      title: "משה לוי",
      rrule: {
        freq: "weekly",       // תדירות - שבועי
        interval: 2,          // חזרה כל שבוע
        byweekday: "mo",      // יום שני בלבד
        dtstart: "2024-11-04T10:00:00", // תאריך ושעה התחלה
        count: 20
      },
      duration: "00:45:00"  ,  // משך הפגישה
      exdate: ["2024-11-11T10:00:00","2024-11-25T10:00:00"]
    });

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
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,rrulePlugin]}
        initialView={display}
        key={display} 
        events={myEvents}
      />

      <button>הוסף חופשה</button>
    </div>
  );
}

export default Calendar;
