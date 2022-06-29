import ConversationModal from '../models/ConversationModal.js'
import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {
    const conversation = new ConversationModal(req.body)
    try{
        await conversation.save()
        res.send('conversation created')
    }
    catch(e){
        res.status(400).json(e)
    }

})

export default router

