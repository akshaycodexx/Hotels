const mongoose=require("mongoose");

require("dotenv").config();

const ConnectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://akshaycodex:Software@143A@myappdb.qpclqow.mongodb.net/?retryWrites=true&w=majority&appName=MyAppDB")
        console.log("MongoDB Connected !!")
    } catch(error){
        console.error("Mongoose Connection Failed !!",error.message);
        process.exit(1)
    }
}

module.exports=ConnectDB;