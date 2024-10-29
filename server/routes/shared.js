module.exports=(app)=>{
    app.get('/shared',(req,res)=>{
        res.send("I shared")
    })
}