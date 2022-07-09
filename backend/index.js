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
app.use(cors())
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
mongoose.connect('MONGODB = mongodb+srv://projecttest:sunzxcvbnm123@cluster0.09vfn.mongodb.net/test',()=>{});



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
    !currentUsers.some(element => element.userId === userId) &&
    currentUsers.push({userId,socketId})
}
const disconnectUser = (socketId)=>{
    currentUsers = currentUsers.filter(element=>element.socketId!==socketId)
}

io.on("connection", socket=>{
    socket.emit("hello","socket is working")
    socket.on("adduser",arg=>{
        addUser(arg.userId,arg.socketId)
        console.log(currentUsers)
        socket.emit('online',currentUsers)
    })
    socket.on('disconnect',()=>{
        disconnectUser(socket.id)
        console.log(currentUsers)
        console.log('disconnect')
        socket.emit('online',currentUsers)
    })
    socket.on('message',arg=>{
        const user = currentUsers.find(e=>e.userId === arg.userId )
        user && socket.to(user.socketId).emit('receiveMessage',{message:arg.messageText,senderId:arg.senderId,messageId:arg.messageId})        
    })
})


server.listen(port)