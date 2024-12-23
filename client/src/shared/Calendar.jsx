import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import styles from "./Calendar.module.css"; // ייבוא כ-CSS מודול
import { UserContext } from "../UserContext";

function Calendar() {
  const [display, setDisplay] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vacationStart, setVacationStart] = useState("");
  const [vacationEnd, setVacationEnd] = useState("");

  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const fetchEvents = async () => {
    try {
      // משיכת חגים עבריים
      const holidaysResponse = await fetch(
        "http://localhost:3300/shared/hebrewHolidays/getHolidays"
      );
      const holidays = await holidaysResponse.json();
      const holidayEvents = holidays.map((holiday) => ({
        id: holiday.id,
        title: holiday.title,
        start: holiday.date,
        allDay: true,
        color: "green", // צבע ירוק עבור חגים
      }));

      // משיכת חופשות וטיפולים
      const [vacationsResponse, treatmentsResponse] = await Promise.all([
        fetch("http://localhost:3300/therapist/treatmentDiary/vacationays", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }),
        fetch("http://localhost:3300/therapist/receivingTreatmentDates", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }),
      ]);

      const vacationsJson = await vacationsResponse.json();
      const treatmentsJson = await treatmentsResponse.json();

      const vacations = Array.isArray(vacationsJson) ? vacationsJson : [];
      const treatments = Array.isArray(treatmentsJson) ? treatmentsJson : [];

      // טיפול בחופשות
      const vacationEvents = vacations
        .map((event) => {
          const start_date = new Date(event.start_date);
          const end_date = new Date(event.end_date);

          if (isNaN(start_date) || isNaN(end_date)) {
            console.error("Invalid date:", event.start_date, event.end_date);
            return null;
          }

          return {
            id: event.vacation_id,
            title: "חופשה",
            start: start_date.toISOString(),
            end: end_date.toISOString(),
            color: "red",
          };
        })
        .filter((event) => event !== null);

      // טיפול בטיפולים
      const treatmentEvents = treatments
        .map((event) => {
          const startTime = `${event.treatment_date.substring(0, 10)}T${event.treatment_time}`;
          const startDate = new Date(startTime);
          const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);

          if (isNaN(startDate) || isNaN(endDate)) {
            console.error("Invalid treatment date:", startTime);
            return null;
          }

          return {
            id: event.treatment_id,
            title: `${event.patient_first_name} ${event.patient_last_name}`,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
          };
        })
        .filter((event) => event !== null);

      // עדכון האירועים
      setEvents([...holidayEvents, ...vacationEvents, ...treatmentEvents]);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
   
    fetchEvents();
  }, []);
  
  

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVacationStart("");
    setVacationEnd("");
  };

  const handleVacationSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3300/therapist/treatmentDiary/addingVacationays",
        {
          method: "POST",
          headers: {
             "Content-Type": "application/json" ,
             Authorization: localStorage.getItem("token")
          },
          body: JSON.stringify({
            start_date: vacationStart,
            end_date: vacationEnd,
          }),
        }
      );

      if (response.ok) {
        alert("הנתונים נשלחו בהצלחה!");
          fetchEvents();
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
      <div className={styles.vacationButtonContainer}>
   <button className={styles.vacationButton} onClick={handleOpenModal}>
            הוסף חופשה
          </button>
          </div>
      <div className={styles.calendarContainer}>
      <FullCalendar
  direction="rtl"
  headerToolbar={{
    start: "title",
    center: "timeGridWeek,timeGridDay,dayGridMonth",
    right: "prev,next",
  }}
  buttonText={{
    today: "היום",
    month: "חודש",
    week: "שבוע",
    day: "יום",
  }}
  plugins={[
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin,
    rrulePlugin,
  ]}
  initialView="timeGridWeek"
  key="timeGridWeek"
  events={events}
  slotMinTime="08:00:00"
  slotMaxTime="16:00:00"
  locale="he"
  className={isModalOpen ? styles.dimmed : ""}
/>

      
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
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
              <div className={styles.modalButtons}>
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
