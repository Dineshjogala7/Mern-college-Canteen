const jwt  = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/user");

async function login(req,res) {
    try {
        const {email,password} = req.body;
        const foundUser = await User.findOne({email});
        if(!foundUser)return res.status(404).json({message:"User Not found!!"})
        const match = await bcrypt.compare(password,foundUser.password);
        if(!match) return res.status(401).json({message:"Invalid Password!!"});
        const token  = jwt.sign({id:foundUser._id,email:foundUser.email},process.env.SECRET_KEY,{expiresIn:"999y"});
        return res.json({message:"Login Successfull!",token,user: {
        id: foundUser._id,
        username: foundUser.username,
      },});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error in Login !!"})
    }
}

async function signUp(req,res) {
    try {
        const {username , email , password , phone , role} = req.body;
        const found = await User.findOne({email});
        const hashedPassword = await bcrypt.hash(password,10);
        if(found)return res.status(402).json({message:"email already existed !!"});
        const newUser = await User.create({
            username,email,password:hashedPassword,phone,role
        })
        await newUser.save();
        const token = jwt.sign({id:newUser._id,email:newUser.email},process.env.SECRET_KEY,{expiresIn:"999y"});
        return res.json({message:"SIgn Up done Successfully ",token,user:{
            id:newUser._id,username:newUser.username
        }});
        
    } catch (error) {
        return res.status(500).json({message:"Server Error in SIGNUP !!"})
    }
}

module.exports={login,signUp}