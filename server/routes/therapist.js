module.exports=(app)=>{
    app.get('/therapist',(req,res)=>{
        res.send("I therapist")
    })
}