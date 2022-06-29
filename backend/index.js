import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import morgan from "morgan";
import helmet from "helmet"; 
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authenticationRouter.js";
import postRouter from "./routes/postsRouter.js"
import cors from "cors"
import multer from "multer";
import path from 'path'
import messageRouter from "./routes/messageRouter.js";
import conversationRouter from "./routes/conversationRouter.js";

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
dotenv.config()
app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/post",postRouter)
app.use("/message",messageRouter)
app.use("/conversation",conversationRouter)
mongoose.connect(process.env.MONGODB,()=>{});

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/images")
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name)
    }
})

const upload = multer({storage})
const name = path.resolve()
app.use('/images',express.static(path.join(name,'/public/images')))

app.post("/image/upload",upload.single('file'),(req,res)=>{
    try{
        return res.status(200).json("uploaded")
    }
    catch(e){
        return res.status(400).json(e)
    }
})

app.listen(3001)