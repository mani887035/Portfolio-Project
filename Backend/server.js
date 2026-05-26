const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB Connected");
});

const ContactSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String
});

const Contact = mongoose.model("Contact", ContactSchema);

app.post("/contact", async(req,res)=>{

    try{

        const newMessage = new Contact(req.body);

        await newMessage.save();

        res.json({
            success:true,
            message:"Message Sent Successfully"
        });

    }
    catch(error){

        res.json({
            success:false,
            message:"Server Error"
        });

    }

});

app.listen(5000, ()=>{
    console.log("Server Running On Port 5000");
});