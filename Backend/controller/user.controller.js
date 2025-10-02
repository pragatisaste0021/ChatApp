import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js"

export const signup = async(req, res) => {
    const {fullname, email, password, confirmPassword} = req.body;

    try{
        if(password != confirmPassword){
            return res.status(400).json({error: "Psswords do not match"});
        }
    
        const user = await User.findOne({email});
    
        if(user){
            return res.status(400).json({error: "User already registered"});
        }

        // Hashing the password

        const hashPassword = await bcrypt.hash(password, 10);
    
        const newUser = await new User({fullname, email, password: hashPassword});
    
        await newUser.save();

        if(newUser){
            createTokenAndSaveCookie(newUser._id, res);
            return res.status(201).json({success: "User saved Successfully", user:{
                "_id": newUser._id,
                "fullname": newUser.fullname,
                "email" : newUser.email
               }    
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

export const login= async(req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        const isMatch = await bcrypt.compare(password, user.password);
        if(!user || !isMatch){
            return res.status(400).json({error: "Invalid User Credentials"});
        }
        createTokenAndSaveCookie(user._id, res);
        return res.status(201).json({success: "User Logged In Successfully" ,
               user:{
                "_id": user._id,
                "fullname": user.fullname,
                "email" : user.email
               }    
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout= async(req, res) => {

    try{
        // Clears Cookie
        await res.clearCookie("jwt");
        return res.status(201).json({success: "User Logged Out Successfully"});
    }
    catch(error){
        return res.status(500).json({error: "Internal Server Error"});
    }
}

// Get all users

export const allUsers = async(req, res) => {
    try{
        const loggedInUser = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUser}}).select("-password");
        res.status(201).json(
            filteredUsers)
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}
