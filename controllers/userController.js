const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
//@desc register
//@route POST api/user/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    console.log("The request body is",req.body);
    const {username,email,password} =req.body;
    if(!username|| !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("The requested email is already registered");
    }
    const hashedpassword=await bcrypt.hash(password,10);
    console.log("hashed password",hashedpassword);
    const createUser=await User.create({
        username,email,
        password:hashedpassword
    });
    console.log(`user created${createUser}`);
    if(createUser){
        res.status(201).json({_id:createUser.id,email:createUser.email});
    }
    else{
        res.status(400);
        throw new Error("the registration is failed");
    }
    res.json({message:"register the user"});
});

//@desc Login
//@route POST api/users/login
//@access public
const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
     if(!email || !password){
       res.status(400);
       throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    if(User && ( await bcrypt.compare(password,User.password))){
        const accessToken= jwt.sign(
            {
            username:user.username,
            email:user.email,
            _id:user.id           
        },process.env.ACCESS_TOKEN_SECRET,
         {expiresIn:"1m"}

        )
        res.status(200).json(accessToken);

    }else{
        res.status(401);
        throw new Error("Email or password is not correct");
    }

});

//@desc current user information
//@route POST api/users/current
//@access private

const currentUser=asyncHandler(async(req,res)=>{
res.json(req.user);

});

module.exports={registerUser,loginUser,currentUser};