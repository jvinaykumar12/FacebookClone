import { Add } from '@mui/icons-material'
import { Box, Button, Fab, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { AuthenicationContext } from '../context/AuthContext'

export default function PostModal() {

    const {state} = useContext(AuthenicationContext)
    const [imagefile,setImageFile] = useState(null)
    const [form,setformData] = useState({
        description:""  
    })
    const [toggle,setToggle] = useState(false)
    const handleModel = ()=>{
        setToggle((prev)=>(!prev))
    }

    const updateDescription = (e)=>{
        setformData({
            description:e.target.value
        })
    }

    const submitPost = ()=>{
        const newPost = {
            userId: state.user._id,
            description:form.description,
        }
        if(imagefile) {
            const newNameForImage = Date.now() + imagefile.name 
            newPost.image = newNameForImage
            newPost.name = state.user.name
            const imageData = new FormData()
            imageData.append("name",newNameForImage)
            imageData.append("file",imagefile)
            axios.post("image/upload",imageData)
            .then(()=>{
                console.log("image send successfully")
            })
            .catch((e)=>{
                console.log(e)
            })
        }
        axios.post("post/createPost",newPost)
        .then(()=>{
            console.log("post created successfully")
            window.location.reload()
        })
        .catch((e)=>{
            console.log(e)
        })
    }

  return (
    <>
        <Tooltip title='New Post' onClick={handleModel}>
            <Fab color='primary'>
                <Add/>
            </Fab>
        </Tooltip>
        <Modal open={toggle} onClose={handleModel} sx = {{display:'flex',alignItems:"center",justifyContent:"center"}}>
            <Box sx = {{display:'flex',justifyContent:'center',padding:'15px',
            height:"300px",width:"450px",gap:"20px",flexDirection:"column",
            backgroundColor:"white",borderRadius:"7px"}}>
                <Typography textAlign={'center'}>Create Post</Typography>
                <TextField id="standard-basic" label="Standard" variant="standard" multiline onChange={updateDescription}
                 value = {form.description}/>
                <TextField type="file" id="file" onChange={(e)=>{setImageFile(e.target.files[0])}}></TextField>
                <Button onClick={submitPost}>SUBMIT</Button>
            </Box>
        </Modal>
    </>
  )
}
