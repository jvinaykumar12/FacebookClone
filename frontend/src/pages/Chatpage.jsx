import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MessageText from '../components/MessageText'
import { useEffect } from 'react'
import { AuthenicationContext } from '../context/AuthContext'
import axios from 'axios'

export default function Chatpage() {
    const {state,profile} = useContext(AuthenicationContext)
    const [selectedFriend,setSelectedFriend] = useState(profile)
    const [friendColumn,setFriendColumn] = useState([])
    const [conversationId,setConversationId] = useState(profile.id)
    const [message,setMessage] = useState('')
    const [messageList,setMessageList] = useState([])

    const updateMessage = (e)=>{ 
        setMessage(e.target.value)
    }

    const sendMessage = (e)=>{
        axios.post('/message',{
            message,
            conversationId,
            sender:state.user._id,
        })
    }

    const selectName = (e)=>{
        setSelectedFriend({
            ...e,
            id:e._id
        })
        setConversationId(e.conversationId)
    }

    useEffect(()=>{
        axios.get(`/conversation/list/${state.user._id}`)
        .then(res=>{setFriendColumn(res.data)})
    },[state.user._id,profile.id])

    // useEffect(()=>{
    //     axios.get(``)
    // })

  return (
    <Box>
        <Navbar/>
        <Stack direction='row' spacing={2} justifyContent='space-between' sx={{height:'90vh'}}>
            <Box flex = '1' display='flex' flexDirection='column' gap='10px' padding='10px'>
                {friendColumn.map(details=>{
                    return(<Button key={details._id} onClick={()=>selectName(details)} variant='contained' 
                    color={details._id===selectedFriend.id?"primary":"secondary"}> {details.name}</Button>)
                })}
            </Box>
            <Box flex='3' display='flex' flexDirection='column' gap='10px' padding='10px'>
                <Box sx={{display:'flex',flexDirection:'column',gap:'20px',padding:'10px',minHeight:'50vh' ,overflow:'auto',overscrollBehavior:'contain'}}>
                                            
                </Box>
                <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
                    <TextField multiline rows={3} sx={{width:'30vw'}} onChange={updateMessage} value={message} label={`Message ${selectedFriend.name}`}/>
                    <Button variant='contained' onClick={sendMessage}>SEND</Button>
                </Box>
            </Box>
            
            <Box flex='1'>

            </Box>
        </Stack>
    </Box>
  )
}
