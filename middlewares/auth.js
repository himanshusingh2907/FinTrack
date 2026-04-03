import jwt from "jsonwebtoken"

const auth=async(req,res,next)=>{
  try {
    const token=req.cookies.token;
    if (!token) {
      return res.status(401).json({
         message: "Unauthorized - token missing"
      })
    }
    const decode= jwt.verify(token,process.env.JWTSECRET);
    req.user=decode;
    next();
  }
  catch(error) {
  return res.status(401).json({
    message: "Unauthorized - invalid or expired token"
  })
}
}

export default auth;