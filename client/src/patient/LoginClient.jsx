import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./loginclient.module.css";

function Loginclient() {
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
console.log(2222);

      if (!response.ok) {
        throw new Error("Login failed");
      }


      const { token } = await response.json();
      localStorage.setItem("token", token); // שמירת האסימון
    navigate("/client");
    
    } catch (error) {
      setErrorMessage("שגיאה: לא ניתן להתחבר לשרת");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>כניסת לקוח</h2>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <input
          type="text"
          placeholder="שם משתמש"
          className={styles.inputField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="סיסמה"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={handleSubmit}>
          שלח
        </button>

        <Link to="/" className={styles.link}>
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}

export default Loginclient;
