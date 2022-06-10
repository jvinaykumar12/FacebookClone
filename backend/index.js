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

const app = express()
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
dotenv.config()
app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/post",postRouter)
mongoose.connect(process.env.MONGODB,()=>{});

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/images")
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
})

const upload = multer({storage})
// const upload = multer({dest:"public/images"})
app.post("/image/upload",upload.single("file"),(req,res)=>{
    try{
        return res.status(200).json("uploaded")
    }
    catch(e){
        return res.status(400).json(e)
    }
})

app.listen(3001)