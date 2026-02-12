import express from "express";
import { Book } from "../models/model.js";

const router=express.Router();

router.get('/',async(req,res)=>{
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
router.post('/',async(req,res)=>{
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

router.put('/:id',async(req,res)=>{
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
router.get('/:id',async(req,res)=>{
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

router.delete('/:id',async(req,res)=>{
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

export default router;

