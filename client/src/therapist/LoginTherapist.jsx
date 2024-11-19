import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./css/loginTherapist.css";
function LoginTherapist() {
  const { setUser } = useContext(UserContext);

const selctTarrapist={type:"therapist",therapistId:1}
localStorage.setItem("selectedTherapist",JSON.stringify(selctTarrapist))
const currentUser={type:"therapist",userId:1}
localStorage.setItem("currentUser",JSON.stringify(currentUser))
  useEffect(() => {


    setUser({ type: "therapist", userId: 19 });
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


