import User from "../models/userSchema.js"
import {userSchemaValidatorRegister,userValidatorlogin} from "../validators/userValidator.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateJwt.js"

 export const registerUser=async(req,res)=> {
  try {
    const result=userSchemaValidatorRegister.safeParse(req.body);
    if(!result.success) {
      return res.status(400).json({
        message:"plss enter all fields"
      })
    }
   
    const {name,email,password}=result.data;
    const userExist=await User.findOne({email});
    if(userExist) {
      return res.status(409).json({
        message:"user already exists"
      })
    };
    const hashPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({
      name,email,
      password:hashPassword
    }
    );
    const token=generateToken(newUser._id,newUser.role);
    res.cookie("token",token,{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge:24*60*60*1000
    })
    return res.status(201).json({
      message:"User has been created",
      token
    })
  }
  catch(error) {
    return res.status(500).json({
      message:error.message
    })
  }
}

export const loginUser=async(req,res)=>{
  try {
    const result =userValidatorlogin.safeParse(req.body);
    if (!result.success){
      return res.status(400).json({
        message:"fields are missing"
      })
    };
    const {email,password} =result.data;
   const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(401).json({
        message:"invalid credentials"
      })
    };
   
    const isMatch= await bcrypt.compare(password,existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message:"password does not match login again "

      })
    }
    const token=generateToken(existingUser._id,existingUser.role);
    res.cookie("token",token,{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge:24*60*60*1000
    });
    return res.status(200).json({
      message:"user has been login successfully"
    })
  }
  catch(error) {
    return res.status(500).json({
      message:error.message
    })
  }
}