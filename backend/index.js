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
import {Server} from "socket.io";
import http from "http"

const app = express()
const server = http.createServer(app)
const name = path.resolve()                                                                             
const port = process.env.PORT||3001 
app.use(cors(
    {
        origin:'*'
    }
))
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
dotenv.config()
app.use('/',express.static(path.join(name,'build')))
app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/post",postRouter)
app.use("/message",messageRouter)
app.use("/conversation",conversationRouter)
mongoose.connect(process.env.MONGODB,()=>{});

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{                                           //save images
        cb(null,"public/images")
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name)
    }
})
const upload = multer({storage})
app.use('/images',express.static(path.join(name,'/public/images')))
app.post("/image/upload",upload.single('file'),(req,res)=>{
    try {
        return res.status(200).json("uploaded")
    }
    catch(e) {
        return res.status(400).json(e)
    }
})


const io = new Server(server,{
    cors:{
        origin:'*'
    }                                                               //handles socket,.io
})
let currentUsers = []

const addUser = (userId,socketId)=>{
    currentUsers = currentUsers.filter(element=>element.userId!==userId) 
    currentUsers.push({userId,socketId})
}

const disconnectUser = (socketId)=>{
    currentUsers = currentUsers.filter(element=>element.socketId!==socketId)    
}

io.on("connection", socket=>{

    socket.on("adduser",arg=>{
        console.log(arg)
        addUser(arg.userId,socket.id)
        console.log(currentUsers)
        io.emit('online',currentUsers)
    })
    socket.on('disconnect',()=>{
        disconnectUser(socket.id)
        console.log(currentUsers)
        console.log('disconnect ---------- ed')
        io.emit('disonline',currentUsers)
    })
    socket.on('message',arg=>{
        const user = currentUsers.find(e=>e.userId === arg.userId )
        user && io.to(user.socketId).emit('receiveMessage',{message:arg.messageText,senderId:arg.senderId,messageId:arg.messageId})        
    })
})


server.listen(port)