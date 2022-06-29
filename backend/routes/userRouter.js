import express from "express";
import bcrypt from  "bcrypt";
import Usermodel from "../models/Usermodel.js";
const Usersrouter = express.Router()

Usersrouter.put("/:id", async(req,res)=>{
    if(req.params.id === req.body.id) {
        if(req.body.password){
            try{
                const salt =  bcrypt.genSaltSync(10)
                const newpassWord =  bcrypt.hashSync(req.body.password,salt)
                req.body.password = newpassWord
            }
            catch(e) {
               return  res.send(e.message)
            }
        }
        try {
            await Usermodel.findByIdAndUpdate({_id:req.body.id},{$set:req.body})
            res.send("update succesfully")
        }
        catch(e){
            return res.send(e.message)
        }

    }
    else {
        res.status(400).send('impossible to update')
    }
})

Usersrouter.delete("/:id", async(req,res)=>{
    if(req.params.id === req.body.id) {
        try {
            await Usermodel.deleteOne({_id:req.body.id})
            res.send("deleted successfully")
        }
        catch(e){
            return res.send(e.message)
        }

    }
    else {
        return res.status(400).send('impossible to delete')
    }
})

Usersrouter.get("/:userName", async(req,res)=>{

     try{
        const test = await Usermodel.findOne({name:req.params.userName})
        if(test){
            const {password,...other} = test._doc
            res.json(other)
        }
        else {
            res.status(404).send("UserNotfound")
        }
     }
     catch(e){
         res.send(e.message)
     }
    
})


Usersrouter.put("/follow/:name", async(req,res)=>{
        if(req.params.name===req.body.name){
            res.send('you can not follow yourself')
        }
        try{
            const specialPerson = await Usermodel.findOne({name:req.params.name})
            const normalPerson = await Usermodel.findOne({_id:req.body.id})
            if(!specialPerson.followers.includes(req.body.id)) {
                await normalPerson.updateOne({$push:{following:specialPerson._id}})
                await specialPerson.updateOne({$push:{followers:req.body.id}})
                res.send("succefully followed")
            }
            else{
                res.send("already following")
            }
        }
        catch(e){
            return res.send(e.message)
        }   
})

Usersrouter.put("/unfollow/:name", async(req,res)=>{
        try{
            const specialPerson = await Usermodel.findOne({name:req.params.name})
            const normalPerson = await Usermodel.findOne({_id:req.body.id})
            if(specialPerson.followers.includes(req.body.id)) {
                await normalPerson.updateOne({$pull:{following:specialPerson._id}})
                await specialPerson.updateOne({$pull:{followers:req.body.id}})
                res.send("succesfully unfollowed")
            }
            else{
                res.send("already not following")
            }
        }
        catch(e){
            return res.send(e.message)
        }  
})

Usersrouter.get("/friendList/:id", async(req,res)=>{
    try{
        const temp = await Usermodel.findOne({_id:req.params.id})
        const friendsList = []
        const findNames = temp.following.map(e => {
            return (
                Usermodel.findById(e)
                .then(userName=>{
                    friendsList.push({
                    name:userName.name,
                    id:e
                    })
                    return Promise.resolve()
                })
            )            
        });
        await Promise.all(findNames)
        res.json(friendsList)
    }
    catch(e) {
        res.send(e)
    }

})

export default Usersrouter
