import express from "express";
const app=express();
import {PORT} from "./config.js";


app.listen(PORT,()=>{
    console.log(`App listening :${PORT}`);  

})
app.get('/',(req,res)=>{
    console.log("Entered into server ");
    return res.send("Hello World");
})