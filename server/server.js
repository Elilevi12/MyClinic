const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors()); 

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("I server")
})

const admin=require('./routes/admin')(app)
const shared=require('./routes/shared')(app)
const patient=require('./routes/patient')(app,mysql)
const therapist=require('./routes/therapist')(app)

app.listen(3300, () => {
console.log( `Server is running on port 3300`);
 ;
});
