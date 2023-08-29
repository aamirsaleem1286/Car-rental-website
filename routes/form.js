const router=require("express").Router()
const Form=require("../models/Formjs")


router.post('/register',async(req,res)=>{
    try {
        //  const isuser=await User.findOne({email:req.body.email})
    
        //  if (!isuser) {
        const formUser= new Form({
           firstname:req.body.firstname,
           email:req.body.email,
           address:req.body.address,
           person:req.body.person,
           month:req.body.month, 
           message:req.body.message,
           lastname:req.body.lastname,
           phone:req.body.phone, 
           toaddress:req.body.toaddress,
           luggae:req.body.luggae,
           journeytime:req.body.journeytime, 
        })    
        await formUser.save()
        res.status(200).json("form detail add successfully")  

        // } 
        // else {
        //   res.status(400).json("user already exist")  
        // } 
         
    } catch (error) {
            res.status(500).json(error.message)  

            console.log(error)
    }

})
module.exports=router