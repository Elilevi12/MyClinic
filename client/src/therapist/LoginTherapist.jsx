import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/loginTherapist.module.css";

function LoginTherapist() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("1111");
    
    try {
      const response = await fetch("http://localhost:3300/shared/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }
      const { token } = await response.json();
      localStorage.setItem("token", token); // שמירת האסימון
      navigate("/therapist");
    } catch (error) {
      setErrorMessage("שגיאה: לא ניתן להתחבר לשרת");
    }
  };
  return (
    <div className={styles.loginTherapistContainer}>
      <h2 className={styles.heading}>התחברות מטפל</h2>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <input
        className={styles.input}
        type="text"
        placeholder="שם משתמש"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>שלח</button>
    </div>
  );
};

export default LoginTherapist;