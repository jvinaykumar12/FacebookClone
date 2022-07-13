import messageModal from "../models/messageModal.js";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {               //message  
    const message = new messageModal(req.body);
    try{
        const temp = await message.save();
        res.send(temp)
    }
    catch(e) {
        res.status(400).send(e)
    } 
})

router.get('/:conversationId', async (req,res)=>{
    try{
        const temp = await messageModal.find({conversationId:req.params.conversationId})
        res.send(temp)
    }
    catch(e) {
        res.status(400).send(e)
    }
})

export default router