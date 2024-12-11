import { Link, Outlet } from "react-router-dom";
import styles from "./css/therapistHomePage.module.css";

function TherapistHomePage() {
  return (
    <div className={styles.therapistHomeContainer}>
      <h1 className={styles.heading}>דף הבית</h1>
      <nav className={styles.nav}>
        <Link to="calendar">
          <button className={styles.navButton}>לוח שנה</button>
        </Link>
        <Link to="select-patient">
          <button className={styles.navButton}>תיק רפואי</button>
        </Link>
        <Link to="money-management">
          <button className={styles.navButton}>ניהול כספים</button>
        </Link>
        <Link to={"waiting-list"}>
          <button className={styles.navButton}>רשימת המתנה</button>
        </Link>
        <Link to={"add-patient"}>
          <button className={styles.navButton}>הוספת לקוח</button>
        </Link>
      </nav>
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default TherapistHomePage;
