import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MessageText from '../components/MessageText'
import { useEffect } from 'react'
import { AuthenicationContext } from '../context/AuthContext'
import axios from 'axios'
import { useRef } from 'react'

export default function Chatpage() {
    const {state,profile} = useContext(AuthenicationContext)
    const [selectedFriend,setSelectedFriend] = useState(profile)
    const [friendColumn,setFriendColumn] = useState([])
    const [conversationId,setConversationId] = useState()
    const [message,setMessage] = useState('')
    const [messageList,setMessageList] = useState([])
    const scrollReference = useRef()

    const updateMessage = (e)=>{ 
        setMessage(e.target.value)
    }

    const sendMessage = (e)=>{
        axios.post('/message',{
            message,
            conversationId,
            sender:state.user._id,
        })
        .then((res)=>{
            setMessageList([...messageList,
                <div ref={scrollReference} key={res.data._id}>
                    <MessageText  props={{isYou:res.data.sender===state.user._id?true:false,message:res.data.message}}/>
                </div>
            ])
            setMessage('')
        })
    }

    const selectName = (e)=>{
        setSelectedFriend({
            ...e,
            id:e._id
        })
        setMessage('')
        setConversationId(e.conversationId)   
    }

    useEffect(()=>{
        axios.get(`/conversation/list/${state.user._id}`)
        .then(res=>{
            let initialConversationId = null
            res.data.forEach((details)=>{
                if(details._id===profile.id) initialConversationId = details.conversationId
            })
            if(initialConversationId) setConversationId(initialConversationId)
            setFriendColumn(res.data)
        })
    },[state.user._id,profile.id])

    useEffect(()=>{
        if(conversationId) {
            axios.get(`/message/${conversationId}`)
            .then(res=>{
                const temp = res.data.map(details=>{
                    return(
                        <div ref={scrollReference} key={details._id}>   
                            <MessageText  props={{isYou:details.sender===state.user._id?true:false,message:details.message}}/>
                        </div>
                    )
                })
                setMessageList(temp)
            })
        }
        
    },[conversationId])

    useEffect(()=>{
        if(scrollReference.current) {
            scrollReference.current.scrollIntoView()
        }
    },[messageList])

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
                    {
                        messageList
                    }             
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