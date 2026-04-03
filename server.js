import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import limiter from "./utils/rateLimiter.js"
import router from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import dashboardRouter from "./routes/dashboardRoutes.js"
import transactionRouter from "./routes/transactionRoutes.js"
import authRouter from "./routes/authRoutes.js"
dotenv.config();
const app=express();
app.use(limiter);
app.use(express.json());
app.use(cookieParser())
app.use("/api/transactions", transactionRouter) 
app.use("/api/users", router)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/auth",authRouter)




app.get('/',(req,res)=>{
  res.send("this is a homepage")
})

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})