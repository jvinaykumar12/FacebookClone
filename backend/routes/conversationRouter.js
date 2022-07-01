import ConversationModal from '../models/ConversationModal.js'
import UserModel from '../models/Usermodel.js'
import { Router } from 'express'

const router = Router()

router.post('/', async (req, res) => {                    //conversation
    const conversation = new ConversationModal(req.body)
    try{
        await conversation.save()
        res.send('conversation created')
    }
    catch(e){
        res.status(400).json(e)
    }

})

router.get('/isExists/:id1/:id2' , async(req,res)=>{
    try {
        const temp = await ConversationModal.find({members:{$all:[req.params.id1,req.params.id2]}})
        if(temp.length) {
            console.log(temp)
            res.send(true)
        }
        else {
            const newConversation  =  new ConversationModal({
                members:[req.params.id1,req.params.id2]
            })
            await newConversation.save()
            res.send('new conversation created')
        }
    }
    catch(e) {
        res.status(400).send(e)
    }
})

router.get('/list/:id', async(req,res)=>{
    try{
        const list = await ConversationModal.find({members:{$all:[req.params.id]}})
        const temp = list.map(item=>{
            const memeberArray =  item.members.filter(e=>e!=req.params.id)
            const a = {
                member:memeberArray[0],
                conversationId:item._id
            }
            return a
        })
        const names = []
        const pArray = temp.map(item=>{
            return (UserModel.findById(item.member)
            .then((temp)=>{
                const final = {
                    ...temp._doc,
                    conversationId:item.conversationId
                }                
                names.push(final)
                return Promise.resolve()
            }))
        })
        await Promise.all(pArray)
        res.json(names)
    }
    catch(e) {
        console.log(e)
        res.status(404).send(e)
    }
})

export default router

