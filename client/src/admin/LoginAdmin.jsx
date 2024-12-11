import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/loginAdmin.module.css';

function LoginAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
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

      const data = await response.json();

      if (data && data.id && data.type === "admin") {
        localStorage.setItem("currentUser", JSON.stringify(data));
        navigate("/admin");
      } else {
        setErrorMessage("שם המשתמש או הסיסמה שגויים");
      }
    } catch (error) {
      setErrorMessage("שגיאה: לא ניתן להתחבר לשרת");
    }
  };

  return (
    <div className={styles.loginAdminContainer}>
      <h2 className={styles.header}>כניסת מנהל</h2>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <input
        type="text"
        placeholder="שם משתמש"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={handleSubmit} className={styles.submitButton}>
        שלח
      </button>
    </div>
  );
}

export default LoginAdmin;
