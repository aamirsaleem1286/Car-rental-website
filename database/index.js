const mongoose=require("mongoose")

// const string="mongodb+srv://aamirsaleem1282:admin1234@cluster0.ggjuo2g.mongodb.net/?retryWrites=true&w=majority"


const dbconnect= async()=>{
    try {
        mongoose.set('strictQuery',false)
        const conn=await mongoose.connect(process.env.MONGO_CONNECT)
        console.log(`mongoose is connect",${conn.connection.host}`
        )
    } catch (error) {
        console.log("my error",error)
    }
    

}
module.exports=dbconnect
