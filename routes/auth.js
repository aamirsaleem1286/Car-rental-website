const router=require("express").Router()
const User=require("../models/user")
const passport=require('passport')
var session = require('express-session')


router.get('/auth/github',
passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('http://localhost:3000/');
});

router.get('/auth/github/callback',passport.authenticate("google",{
        successRedirect:"http://localhost:3000/",
        failureRedirect:"/auth/github/failure"
}))

router.get('/auth/github/failure',(req,res)=>{
        res.json("some thing is wrong")
})


router.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 
router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: '/auth/google/failure'
}));
router.get('/auth/google/failure',(req,res)=>{
        res.json("some thing is wrong")
})
router.get("/logout",(req,res)=>{
        req.logout();
        res.redirect(process.env.CLIENT_URL)
})


router.get('/auth/facebook',
  passport.authenticate('facebook'));

  router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
  });
  router.get('/auth/facebook/failure',(req,res)=>{
        res.json("some thing is wrong")
})

router.get('/reg',(req,res)=>{
        res.json("ok")
})

router.post('/register',async(req,res)=>{
        try {
             const isuser=await User.findOne({email:req.body.email})
        
             if (!isuser) {
            const saveUser= new User({
               username:req.body.username,
               email:req.body.email,
               password:req.body.password,
               rePassword:req.body.rePassword,
               phone:req.body.phone, 
               country:req.body.country
            })    
            await saveUser.save()
            res.status(200).json("user add successfully")  

            } else {
              res.status(400).json("user already exist")  
            } 
             
        } catch (error) {
                res.status(500).json(error.message)  

                console.log(error)
        }

})

router.post('/login',async(req,res)=>{
        try {
        const isuser=await User.findOne({email:req.body.email})    
if(isuser){


if (isuser.password===req.body.password) {
        res.status(200).json("login success")  

} else {
        res.status(400).json("wrong password")  

}
}else {
        res.status(400).json("user not register")  

}

        
} catch (error) {
        console.log("aamir login error",error)
}



})





module.exports=router