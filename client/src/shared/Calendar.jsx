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

  const patientId1 = 123456789;
  const patientId2 = 987654321;

  const fetchPatientDetails = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3300/therapist/getPatientsByTherapist/${id}`
      );
      if (!response.ok) {
        throw new Error("שגיאה בקבלת פרטי המטופל");
      }
      const data = await response.json();

      // הוספת אירוע מהשרת לאירועים הקיימים
      const newEvent = {
        title: `${data.first_name} ${data.last_name}`,
        rrule: {
          freq: "weekly", // תדירות - שבועי
          interval: 1, // חזרה כל שבוע
          byweekday: "mo", // יום שני בלבד
          dtstart: `2024-11-05T${data.treatment_time}`, // תאריך ושעה התחלה
          count: data.approved_sessions - 1,
        },
        duration: "00:45:00", // משך הפגישה
        exdate: ["2024-11-11T10:00:00", "2024-11-25T10:00:00"],
      };

      setEvents((events) => [...events, newEvent]); // עדכון המצב של אירועים עם הנתונים החדשים

      console.log(data.treatment_time);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPatientDetails(patientId2);
    console.log(events);

    fetchPatientDetails(patientId1);
    fetchPatientDetails(123454321);
    console.log(events);
  }, []); // קריאה לפונקציה פעם אחת בלבד כאשר הרכיב נטען

  const handleDisplayChange = (view) => {
    setDisplay(view);
  };
  console.log(events);

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
        events={events} // העברת מצב האירועים כפרופס
      />

      <button>הוסף חופשה</button>
    </div>
  );
}

export default Calendar;
