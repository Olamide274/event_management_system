const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken')
// REGISTER USER
// /api/users/register POST

const registerUser = asyncHandler(async(req,res) => {
    const {username,email,password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400)
        throw new Error("User is already registered");
        
    }

    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed Password:", hashedPassword)

    const newUser = await User.create({username,email, password: hashedPassword})
    console.log(`User create is ${newUser}`)
    if(newUser){
        res.status(201).json({_id: newUser.id, email: newUser.email})
    }else{
        res.status(400)
        throw new Error("User data is not valid");
        
    }
    res.json({message: "Register User"})
})

// LOGIN USER
// /api/users/login POST

const loginUser = asyncHandler(async(req,res) => {
   const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
    );
    res.status(200).json({accessToken})
    }else{
        res.status(400)
        throw new Error("Email or Password is not Valid ");
        
    }
    res.json({message: "Login User"})
})

// CURRENT USER
// /api/users/current GET

const currentUser = asyncHandler(async(req,res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}