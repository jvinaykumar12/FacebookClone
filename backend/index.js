import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import morgan from "morgan";
import helmet from "helmet"; 
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authenticationRouter.js";
import postRouter from "./routes/postsRouter.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
dotenv.config()
app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/post",postRouter)
console.log("last")
mongoose.connect(process.env.MONGODB,()=>{
    console.log("mongodb")
});
console.log("finish")

app.listen(3001)