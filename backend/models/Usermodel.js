import mongoose from "mongoose";

const Schema = mongoose.Schema({
    name:{
        type:String,
        min:16,
    },
    age:{
        type:Number,
        min:5,
    },
    password:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
    location:{
        type: String,
    },
    createdAt:{
        type:Date,
        default:()=>Date.now()
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }
})


export default mongoose.model("userList",Schema)