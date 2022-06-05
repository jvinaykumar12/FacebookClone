import mongoose from "mongoose";

const schema = mongoose.Schema({

    userId:{
        type:String,
    },
    name:{
        type:String,
    },
    image:{
        data:Buffer,
        contentType:String
    },
    description:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
    dislikes:{
        type:Array,
        default:[]
    }
    
},{timestamp:true})

export default mongoose.model("postList",schema)