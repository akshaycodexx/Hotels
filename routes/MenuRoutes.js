const express=require("express")
const router=express();
const Menu=require("../models/menu.js")


router.post("/",async (req,res)=>{
    try{
        const menudata=req.body;
        const newMenu= new Menu(menudata);
       const menusaved=await newMenu.save();
       console.log(menusaved);
        res.status(200).json(menusaved)
        
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Menu fetch data from body-parser failed!!"})

    }
})

router.get("/",async (req,res)=>{
    try{
        const datafromDb=await Menu.find()
        console.log("data-fetched-menu")
        res.status(200).json(datafromDb)
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"Menu fetching failed from db"})

    }
})

router.get("/:taste",async (req,res)=>{
    try{

    const tastfromurl=req.params.taste;
    if(tastfromurl=="sweet" || tastfromurl=="spicy" || tastfromurl=="sour"){
        // mil giya to dataBase se sara related data niklo
        const response= await Menu.find({taste:tastfromurl})
        console.log("Fetching successfull!!")
        res.status(200).json(response);
    }else{
        res.status(404).json({error:"Internal server Isseue"})
    }

}catch(error){
    console.log(error)
     res.status(404).json({error:"Internal server Isseue"})

}
})

module.exports=router;