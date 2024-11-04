import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>ברוכים הבאים</h1>
      <Link to="/login-client">
        <button>כניסת לקוחות</button>
      </Link>
      <Link to="/login-authorized">
        <button>כניסת מורשים</button>
      </Link>
    </div>
  );
}

export default LandingPage;