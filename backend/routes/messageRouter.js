import messageModal from "../models/messageModal.js";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    const message = new messageModal(req.body);
    try{
        await message.save();
        res.send('message sent')
    }
    catch(e) {
        res.status(400).send(e)
    }
})

export default router