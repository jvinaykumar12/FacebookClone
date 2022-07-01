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

router.get('/list/:id', async(req,res)=>{
    try{
        const list = await ConversationModal.find({members:{$all:[req.params.id]}})
        const temp = list.map(item=>{
            return item.members.filter(e=>e!=req.params.id)
        })
        const names = []
        const pArray = temp.map(item=>{
            return (UserModel.findById(item[0])
            .then((temp)=>{
                names.push(temp)
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

