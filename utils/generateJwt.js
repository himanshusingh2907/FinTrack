import jwt from "jsonwebtoken"

const generateToken=(userId,role)=>{
  try {
   
    const token=jwt.sign(
      {userId,role},
      process.env.JWTSECRET,
      {expiresIn:"1d"}
    )

    return token;
  
  }
 catch(error) {
  console.error("Token generation failed:", error.message)
}
}
export default generateToken;
