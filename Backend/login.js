const app=express()
app.get('/login',async(req,res)=>{
    const {email,password}=req.body
    const email_exist=User.find(email)
    if(!email_exist){
        res.status(400).json({message:"User does not exist"})
    }
    const password_check=bcrypt.compare(password,hashedPassword)
    if(!password_check){
        return res.send("Incorrect Password")
    }
    const token=jwt.sign({
        userId:user._id,
        expiresIn:1hr
    })
    return res.send(token,"token created");

})


const authMiddleware=(req,res,next)=>{
    const header=res.headers.authorzation;
    if
    const token=header.split('')[1];

}


app.get('/completed/orders',async(req,res)=>{
    try{
        const user=await user.aggregate([
            {
                $lookup:{
                    

                }
            }
        ])
    }
})