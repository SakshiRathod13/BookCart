import express from 'express'
import bcrypt from 'bcryptjs'


const app=express();
app.post('/users',async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).send("Please fill all the fields");
    }
    try{
        const hashedPassword=await bcrypt.hash(password);
        const newUser=await User.Create({
        email:email,
        password:hashedPassword
    })
    res.status(200).json({message:"Successfully created user"})

    }catch(e){
        res.status(500).send("Unable to create user");
    }



})