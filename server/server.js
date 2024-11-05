const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
app.use(cors());

app.use(express.json());
const db = require("./db/connection");

app.get("/", (req, res) => {
  res.send("I server");
});

const appAdmin = require("./routes/admin");
app.use("/admin/", appAdmin);

const appTherapist = require("./routes/therapist");
app.use("/therapist", appTherapist);

const appShared = require("./routes/shared");
app.use("/shared/", appShared);

const appPatient = require("./routes/patient");
app.use("/patients/", appPatient);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port 3300`);
});
