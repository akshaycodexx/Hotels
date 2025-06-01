const express=require("express");
const mongoose=require("mongoose")
const ConnectDB=require("./db.js");
require("dotenv").config();


const app=express();
app.use(express.json());
ConnectDB();


const bodyParser=require("body-parser")
app.use(bodyParser.json()) // koei v json formate ka data ko ye " req.body" me save kar dega

//page ko display karne ke liye use hota hai 
app.get("/",function(req,res){
    res.send("Hellow")
})





//import the router Files
const personRoutes=require("./routes/PersonRoutes.js")
app.use("/person",personRoutes)

const menuRoutes=require("./routes/MenuRoutes.js")
app.use("/menu",menuRoutes)








app.listen(8080,()=>{
    console.log(`App is running on ${8080}`)
})