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

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(cors({
"origin": "*",
"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
"preflightContinue": false,
"optionsSuccessStatus": 204
}))
app.use(express.json())
mongoConnect()
app.use(express.static(path.join(__dirname,'../frontend/build')))

app.use(passport.initialize())
app.use(passport.session())
// app.use(cookieSession({
//     name: 'session',
//     keys: ["aamir"],
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }))




app.use(router)
app.use('/form',form)
console.log("npm run")

app.use('*',function(req,res){
  res.sendFile(path.join(__dirname,"../frontend/build/index.html"))
})

app.listen(4000)