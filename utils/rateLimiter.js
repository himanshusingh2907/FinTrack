import rateLimiter from "express-rate-limit"

const limiter=rateLimiter({
  windowMs:15*60*1000,
  max:50,
  message:{
    success:false,
    message:"Too many request please try after 15 minutes" 

  },
   standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;