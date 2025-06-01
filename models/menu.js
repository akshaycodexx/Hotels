const mongoose= require("mongoose");

const menuschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingridents:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }

})
module.exports=mongoose.model('Menu',menuschema);