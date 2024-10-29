module.exports=(app)=>{
    app.get('/patient',(req,res)=>{
        res.send("I patient")
    })
}