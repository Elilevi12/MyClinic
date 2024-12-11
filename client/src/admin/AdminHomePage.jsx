import { Link } from 'react-router-dom';
import styles from './css/adminHomePage.module.css';

function AdminHomePage() {
  return (
    <div className={styles.adminHomeContainer}>
      <h1 className={styles.pageTitle}>   ברוך הבא למערכת הניהול</h1>
      <p className={styles.pageSubtitle}>
  
      </p>
      <nav className={styles.adminHomeNav}>
        <Link to="add-therapist">
          <button className={styles.navButton}>הוסף מטפל</button>
        </Link>
        <Link to="list-of-therapists">
          <button className={styles.navButton}>רשימת מטפלים</button>
        </Link>
      </nav>
    </div>
  );
}

export default AdminHomePage;
