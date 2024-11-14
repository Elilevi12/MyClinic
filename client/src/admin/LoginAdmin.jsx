import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './css/loginAdmin.css';

function LoginAdmin() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser({ type: "admin" });
  }, []);

  return (
    <div className="login-admin-container">
      <h2>כניסת מנהל</h2>
      <Link to="/admin" className="admin-link">
        מנהל
      </Link>
      <input type="text" placeholder="שם משתמש" />
      <input type="password" placeholder="סיסמה" />
      <input type="text" placeholder="תעודת זהות" />
      <button>שלח</button>
    </div>
  );
}

export default LoginAdmin;
