const mongoose=require("mongoose")


const personSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    age:{
        type:Number,
        max:50,
        required:true
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
        
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
       maxlength:100,
    },
    salary:{
        type:Number,
        
    }




})
module.exports=mongoose.model('Person',personSchema)