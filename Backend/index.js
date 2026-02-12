import express from "express";
import mongoose from "mongoose";
export const app=express();
app.use(express.json());
import {PORT,mongoDBURL} from "./config.js";
import bookroute from "./routes/bookroute.js"
import cors from "cors";

app.use(express.json());
app.use('/books',bookroute)
app.use(cors())


mongoose.connect(mongoDBURL).then(()=>{
     
    console.log("successfully connected to database");
    app.listen(PORT,()=>{
    console.log(`App listening :${PORT}`);
    }) 

}).catch((error)=>{
    console.log(error);

})



