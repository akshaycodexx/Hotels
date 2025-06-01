const mongoose=require("mongoose");

require("dotenv").config();

const ConnectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected !!")
    } catch(error){
        console.error("Mongoose Connection Failed !!",error.message);
        process.exit(1)
    }
}

module.exports=ConnectDB;