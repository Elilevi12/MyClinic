import { Link } from 'react-router-dom';
import styles from './css/adminHomePage.module.css';

function AdminHomePage() {
  return (
    <div className={styles["admin-home-container"]}>
      <h1>דף הבית למנהל</h1>
      <nav className={styles["admin-home-nav"]}>
        <Link to="calendar">
          <button className={styles["nav-button"]}>לוח שנה</button>
        </Link>
        <Link to="list-of-therapists">
          <button className={styles["nav-button"]}>רשימת מטפלים</button>
        </Link>
      </nav>
    </div>
  );
}

export default AdminHomePage;
