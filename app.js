require("dotenv").config()
const express=require("express")
const app=express()
const mongoConnect=require("./database/index")
const router=require("./routes/auth")
const form=require("./routes/form")
const cors=require("cors")
const cookieSession=require("cookie-session")
const passport=require("passport")
const passportSetup=require("./passport")
const path=require("path")
var session = require('express-session')

app.use(express.json())
app.use(cors())
mongoConnect()
app.use(express.static(path.join(__dirname,'../frontend/build')))
app.use(passport.initialize())
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
app.use(session(sess))
app.use(passport.session())
app.use(router)
app.use('/form',form)
console.log("npm run")
app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})
app.listen(4000)
