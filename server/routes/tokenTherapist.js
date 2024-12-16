require('dotenv').config();
const jwt = require("jsonwebtoken");
const SECRET_KEY =process.env.SECRET_KEY;
const authenticateToken = (req, res, next) => {
const token = req.headers["authorization"];
  
  
  if (!token) {
      return res.status(401).json({ message: "אסימון חסר" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
          return res.status(403).json({ message: "אסימון לא חוקי" });
      }
      req.user = user; // המשתמש שאומת
 if (req.user.type !== "therapist") {
  return res.status(403).json({ message: "גישה אסורה" });
}
      next();
  });
};
module.exports = authenticateToken;