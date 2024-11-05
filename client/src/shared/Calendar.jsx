import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import "./Calendar.css";

function Calendar() {
  const [display, setDisplay] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);

  const therapistId = 1;
  const fetchPatientDetails = async (id) => {
    
    try {
      const response = await fetch(
        `http://localhost:3300/therapist/getPatientsByTherapist/${therapistId}`
      );
      if (!response.ok) {
        throw new Error("שגיאה בקבלת פרטי המטופל");
      }
      const data = await response.json();


const patientEvents=data.map((event) => ({
  title: `${event.first_name} ${event.last_name}`,
  rrule: {
    freq: "weekly", // תדירות - שבועי
    interval: 1, // חזרה כל שבוע
    byweekday: "mo", // יום שני בלבד
    dtstart: `2024-11-05T${event.treatment_time}`, // תאריך ושעה התחלה
    count: event.approved_sessions - 1,
  },
  duration: "00:45:00", // משך הפגישה
  exdate: ["2024-11-11T10:00:00", "2024-11-25T10:00:00"],
}));
setEvents(patientEvents);
     

     
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
    console.log(events);

  
  }, []); 

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
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          rrulePlugin,
        ]}
        initialView={display}
        key={display}
        events={events} 
      />

      <button>הוסף חופשה</button>
    </div>
  );
}

export default Calendar;
