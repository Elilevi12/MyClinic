import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import "./Calendar.css";
import { UserContext } from "../UserContext";

function Calendar() {
  const [display, setDisplay] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vacationStart, setVacationStart] = useState("");
  const [vacationEnd, setVacationEnd] = useState("");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    
    if (currentUser.type === "therapist") {
      
      Promise.all([
        fetch(`http://localhost:3300/therapist/treatmentDiary/vacationays/${(currentUser.userId)}`).then((response) => response.json()),
        fetch(`http://localhost:3300/therapist/receivingTreatmentDates/${(currentUser.userId)}`).then((response) => response.json()),
      ])
        .then(([vacations, treatments]) => {
          const vacationEvents = vacations.map((event) => {
            const start_date = new Date(event.start_date);
            const end_date = new Date(event.end_date);
            return {
              id: event.vacation_id,
              title: "חופשה",
              start: start_date.toISOString(),
              end: end_date.toISOString(),
              color: "red"
            };
          });
  
          const treatmentEvents = treatments.map((event) => {
            const startTime = `${event.treatment_date.substring(0, 10)}T${event.treatment_time}`;
            const startDate = new Date(startTime);
            const endDate = new Date(startDate.getTime() + 45 * 60 * 1000); // הוספת 45 דקות
            return {
              id: event.treatment_id,
              title: `${event.patient_first_name} ${event.patient_last_name}`,
              start: startTime,
              end: endDate.toISOString()
            };
          });
  
          // שילוב הנתונים של החופשות והטיפולים
          setEvents([...vacationEvents, ...treatmentEvents]);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }
  }, []);
  

 
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVacationStart("");
    setVacationEnd("");
  };

  const handleVacationSubmit = async ()=> {
   
    
    try {
      const response = await fetch(
        "http://localhost:3300/therapist/treatmentDiary/addingVacationays",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            therapist_id: 1,
            start_date: vacationStart,
            end_date: vacationEnd,
        }
      )});
     
      if (response.ok) {
        alert("הנתונים נשלחו בהצלחה!");
      } else {
        alert("שגיאה בשליחת הנתונים");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("שגיאה בשליחת הנתונים");
    }
    handleCloseModal();
    
  };

  return (
    <div>
      <div className="calendar-container">
  
        <FullCalendar
        direction="rtl"
        headerToolbar={
          {
            start: 'title',
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
            right: 'prev,next'
          }
        }
        buttonText={
          {
            today: 'היום',
            month: 'חודש',
            week: 'שבוע',
            day: 'יום',
           
          }

        }
  plugins={[
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    rrulePlugin,
  ]}
  initialView={display}
  key={display}
  events={events}
  slotMinTime="08:00:00"
  slotMaxTime="16:00:00"
  locale="he"
  className={isModalOpen ? "dimmed" : ""} 
/>


        {currentUser.type === "therapist" && (
          <button className="vacation-button" onClick={handleOpenModal}>
            הוסף חופשה
          </button>
        )}
      </div>

      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-content">
        <h3>הוסף חופשה</h3>
        <label>
          תאריך התחלה:
          <input
            type="date"
            value={vacationStart}
            onChange={(e) => setVacationStart(e.target.value)}
          />
        </label>
        <label>
          תאריך סיום:
          <input
            type="date"
            value={vacationEnd}
            onChange={(e) => setVacationEnd(e.target.value)}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleVacationSubmit}>שלח</button>
          <button onClick={handleCloseModal}>ביטול</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Calendar;
