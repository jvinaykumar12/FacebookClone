import { Router } from "express";
import postModel from "../models/postModel.js";
import Usermodel from "../models/Usermodel.js"
const postRouter = Router()

// get timeline post 
const testElement = "hello"

postRouter.post("/createPost",async (req,res)=>{
    try{
        const test  = new postModel(req.body)
        await test.save()
        res.send(test)
    }
    catch(e) {
        res.send(e.message)
    }
    
})



postRouter.put("/:id", async (req,res) =>{
    try{
        const post = await postModel.findById(req.params.id)

        if(post && req.body.userId === post.userId) {
            await post.updateOne({$set:req.body})
            res.send("updated successfully")
        }
        else {
            res.send("You cant update the post")
        }
    }
    catch(e) {   
        res.status(403).send(e.message) 
    }
})

postRouter.delete("/:id", async (req,res) =>{
    try{
        const post = await postModel.findById(req.params.id)

        if(post && req.body.userId === post.userId) {
            await post.deleteOne()
            res.send("deleted successfully")
        }
        else {
            res.send("You cant delete the post")
        }
    }
    catch(e) {   
        res.status(403).send(e.message) 
    }
})

postRouter.put("/:id/like",async (req,res)=>{
    try{
        console.log("liked")
        const post = await postModel.findById(req.params.id)
        if(post) {
            if(!post.likes.includes(req.body.id)) {
                await post.updateOne({$push:{likes:req.body.id}})
                res.send("liked")
            }
            else {
                await post.updateOne({$pull:{likes:req.body.id}})
                res.send("unliked")
            }
        }
        else {
            res.json("not found")
        }
    }
    catch(e) {
        res.send(e.message)
    }
})

postRouter.put("/:id/dislike",async (req,res)=>{
    try{
        console.log("disliked")
        const post = await postModel.findById(req.params.id)
        if(post) {
            if(!post.dislikes.includes(req.body.id)) {
                await post.updateOne({$push:{dislikes:req.body.id}})
                res.send("disliked")
            }
            else {
                await post.updateOne({$pull:{dislikes:req.body.id}})
                res.send("unDisliked")
            }
        }
    }
    catch(e) {
        res.send(e.message)
    }
})

postRouter.get("/:userName", async (req,res)=>{
    try{
        console.log("test")
        const id = await Usermodel.findOne({name:req.params.userName})
        console.log(id)
        const post = await postModel.find({userId:id._id})
        console.log(post)
    
        if(post) {
            res.json({
                Iserror:false,
                post:post
            })
        }
    }
    catch(e) {
        res.send({
            Iserror:true,
            error:e.message
        })
    }
})



postRouter.get("/timeline/:id",async(req,res)=>{
    try{
        const post = await Usermodel.findOne({_id:req.params.id})
        const allPosts = []
        const follow = post.following.map(e=> {
             return (
                postModel.find({userId:e})
                .then(data=>{
                    data.forEach(element => {
                        allPosts.push(element)
                    });
                    return Promise.resolve()
                })
             )
        });

        follow.push(postModel.find({userId:req.params.id})
        .then(data=>{
            data.forEach(element => {
                allPosts.push(element)
            });
            return Promise.resolve()
        }))

        await Promise.all(follow)

        res.json({
            Iserror:false,
            post:allPosts   
        })
    }
    catch(e){
        res.send({
            Iserror:true,
            error:e.message
        })
    }
})

export default postRouter