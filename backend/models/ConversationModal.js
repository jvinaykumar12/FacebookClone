import mongoose from "mongoose";

const schema = new mongoose.Schema({
    members:{
        type:Array
    }
},{timestamps:true})

export default mongoose.model('Conversations',schema)

