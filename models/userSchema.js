import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    minlength:3,
    maxlength:50,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true

  },
  password:{
    type:String,
    required:true,
    minlength:8,
    maxlength:100,
    select:false
    
  },
  role:{
    type:String,
    enum:["viewer", "analyst", "admin"],
    default:"viewer"
  },
  status:{
    type:String,
    enum:["active","inactive"],
    default:"active"
  }
},{
  timestamps:true,
});

const User =mongoose.model("User",userSchema);
export default User;