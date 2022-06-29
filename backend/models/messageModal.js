import mongoose from "mongoose";

const schema = new mongoose.Schema({
    message:{
        type:String
    },
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    isOk:{
        type:Boolean
    }
},{timestamps:true})


export default mongoose.model('Messages',schema)