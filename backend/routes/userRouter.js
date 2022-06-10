import express from "express";
import bcrypt from  "bcrypt";
import Usermodel from "../models/Usermodel.js";
const Usersrouter = express.Router()


//update user
//delete user 
// get a user 
//follow a user 

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

Usersrouter.get("/:id", async(req,res)=>{

     try{
        const test = await Usermodel.findOne({_id:req.params.id})
        if(test){
            console.log(test)
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


Usersrouter.put("/follow/:id", async(req,res)=>{
    if(req.body.id!==req.params.id) {
        try{
            const specialPerson = await Usermodel.findOne({_id:req.params.id})
            const normalPerson = await Usermodel.findOne({_id:req.body.id})
            console.log(specialPerson)
            if(!specialPerson.followers.includes(req.body.id)) {
                await normalPerson.updateOne({$push:{following:req.params.id}})
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
    }
    
})

Usersrouter.put("/unfollow/:id", async(req,res)=>{
    if(req.body.id!==req.params.id) {
        try{
            const specialPerson = await Usermodel.findOne({_id:req.params.id})
            const normalPerson = await Usermodel.findOne({_id:req.body.id})
            console.log(specialPerson)
            if(specialPerson.followers.includes(req.body.id)) {
                await normalPerson.updateOne({$pull:{following:req.params.id}})
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
    } 
    
})

export default Usersrouter