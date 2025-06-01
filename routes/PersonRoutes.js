
const express=require("express")
const router=express();

const Person=require("../models/person")




// ye page ka form se aaya hua data ko backend me vejne ke liye hota hai  ( ye parser ka data Db me vegega)
router.post('/',async(req,res)=>{
   try{
    const data= req.body; // ye web site me koei data enter kiya usko body-parser ke ander save krega
    const newPerson=new Person(data); // ye ek new person bana raha hai or uske andar body parser se fetch kiya hua data use kar arha hai
    const savedPerson= await newPerson.save();// new person database me save kar diya
    console.log("data saved")
    res.status(200).json(savedPerson)


   }catch(err){
    console.log(err);
    res.status(500).json({error:"internal server Issue"})
   }

})



//ye DB ka data display krega

router.get("/",async (req,res)=>{
    try{

        const data=await Person.find();
        console.log("Data fetched!!");
        res.status(200).json(data)

    }catch(error){
        console.log(error)
        res.status(500).json({error:"Data Fetching Failed!!"})

    }
})


// ye aacually - link se data means "parameter " laiga phir DB me search krega or result print krega
router.get("/:workType",async (req,res)=>{
    try{
        const workType=req.params.workType; //extract the work from url parser
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response=await Person.find({work:workType});
            console.log("Response Fetched !!")
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid Work Type"})
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Internal server isseure"})

    }
})


router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatespersonData = req.body;
        
        const response = await Person.findByIdAndUpdate(personId, updatespersonData);

        if (!response) {
            return res.status(404).json({ error: "Person Not Found !!" });
        }

        console.log("Data Updated");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server issue" }); // ✅ Fixed typo
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response= await Person.findByIdAndDelete(personId)
        
        if (!response) {
            return res.status(404).json({ error: "Person Not Found !!" });
        }
        console.log("Data Deleted");
        res.status(200).json({message:"Person Deleted Successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server issue" }); 
    }
})


module.exports=router;
