import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <h2>ברוכים הבאים</h2>
      <h1>MY CLINIC</h1>
      <Link to="/login-client">
        <button className={styles.landingButton}>כניסת לקוחות</button>
      </Link>
      <Link to="/login-admin">
        <button className={styles.landingButton}>כניסת מנהל</button>
      </Link>
      <Link to="/login-therapist">
        <button className={styles.landingButton}>כניסת מטפל</button>
      </Link>
    </div>
  );
}

export default LandingPage;
