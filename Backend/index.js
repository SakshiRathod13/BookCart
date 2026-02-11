import express from "express";
import mongoose from "mongoose";
import { Book } from "./models/model.js";
const app=express();
app.use(express.json());
import {PORT,mongoDBURL} from "./config.js";

app.get('/',(req,res)=>{
    console.log("Entered into server ");
    return res.send("Hello World");
})


mongoose.connect(mongoDBURL).then(()=>{
     
    console.log("successfully connected to database");
    app.listen(PORT,()=>{
    console.log(`App listening :${PORT}`);
    }) 

}).catch((error)=>{
    console.log(error);

})
app.get('/book',async(req,res)=>{
    try{
        const books=await Book.find({});
        console.log("you can see all books here");
        return res.status(200).json(  {
                count:books.length,
                "Your Books":books
            });

        

    }catch(e){
        return res.status(400).send({message:e.message});
    }
})
app.post('/book',async(req,res)=>{
    try{
        if(!req.body.title|| !req.body.author ||req.body.Year){
            return res.status(400).send({
                message:"Fill all required fields."
            })
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            Year:req.body.Year,
        }
        const book=await Book.create(newBook);
        console.log("book added");
        return res.status(201).send(book
          
            )
        

    }catch(e){
        console.log(e.message);
        res.status(500).send({message:e.message});

    }
    
})

app.put('/book/:id',async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author){
            return res.status(400).send("Please enter all the required fields");
        }
        const {id}=req.params;
        const ans=await Book.findByIdAndUpdate(id,req.body);
        if(!ans){
            return res.status(400).send("Book not found");
        }
        console.log("succ Altered")
        
        return res.status(200).send(ans);
    }catch(e){
        res.status(e.message);
    }

})
app.get('/book/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const ans=await Book.findById(id);
        if(!ans){
            res.status(500).send("Book not found")
        }
        res.send(ans)

    }catch(e){
        res.status(500).send(e.message)
    }
})

app.delete('/book/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const ans=await Book.findByIdAndDelete(id);


        if(!ans){
            res.send("Book does not exist")
        }
        console.log("succ deleted")

    }catch(e){
        res.send(e.message)
    }

})


