import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./css/loginTherapist.css";
function LoginTherapist() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser({ type: "therapist" });
  }, []);

  return (
    <div className="login-therapist-container">
      <Link to="/therapist" className="link-button">
        מטפל
      </Link>

      <input type="text" placeholder="שם משתמש" />
      <input type="password" placeholder="סיסמה" />
      <input type="text" placeholder="תעודת זהות" />
      <button>שלח</button>
    </div>
  );
}

export default LoginTherapist;


