const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        
        require:true,
        unique:true,
        type:String
    },
    email:{
        require:true,
        unique:true,
        type:String,
    },
  password:{
         require:true,
        type:String,
        validate: {
            validator: v=> /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ .test(v),
            message: "Minimum eight characters,one number and one special character"
        },
   
    },  
      rePassword:{
        require:true,
       type:String,
       ref:'password'
   },
    phone:{
        require:true,
        minLength:11,
        validate: {
            validator: v => /\d{2,3}-\d{6,}/.test(v) || /\d{8,}/.test(v),
            message: "Phone must be 11 digit"
        },
        type:Number
    },
    country:{
        require:true,
        type:String
    },
})

module.exports=mongoose.model('User',userSchema,'User')