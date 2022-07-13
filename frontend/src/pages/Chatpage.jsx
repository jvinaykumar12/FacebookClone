import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useContext } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MessageText from '../components/MessageText'
import { useEffect } from 'react'
import { AuthenicationContext } from '../context/AuthContext'
import axios from 'axios'
import { useRef } from 'react'
import {io} from 'socket.io-client'

export default function Chatpage() {
    const {state,profile} = useContext(AuthenicationContext)
    const [selectedFriend,setSelectedFriend] = useState(profile)
    const [friendColumn,setFriendColumn] = useState([])
    const [conversationId,setConversationId] = useState()
    const [message,setMessage] = useState('')
    const [messageList,setMessageList] = useState([])
    const [incomingMessage,setIncomingMessage] = useState()
    const [currentUsers,setCurrenUsers] = useState()
    const [socketChange,setSocketChange] = useState(null)
    const scrollReference = useRef()
    const socket = useRef()
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
            socket.current.emit('message',{messageText:message,userId:selectedFriend.id,
            messageId:res.data._id,senderId:state.user._id})
            console.log(socket.current.id)
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

    useEffect(()=>{
        if(incomingMessage && incomingMessage.senderId===selectedFriend.id) {
            setMessageList([...messageList,
                <div ref={scrollReference} key={incomingMessage.messageId}>
                    <MessageText  props={{isYou:false,message:incomingMessage.message}}/>
                </div>
            ])
        }
    },[incomingMessage])

    useEffect(()=>{
        if(socket.current) {
            socket.current.emit('adduser',{userId:state.user._id})   
        }
    },[socketChange])

    useEffect(()=>{
        if(!socket.current) {
            socket.current = io()
            socket.current.on('online',arg=>{
                console.log(arg)
                setCurrenUsers(arg)
            })
            socket.current.on('receiveMessage',(message)=>{
                setIncomingMessage(message)              
            })
            socket.current.on('connect',()=>{
                console.log(socket.current.id)
                if(socket.current.connected) {
                    setSocketChange(socket.current.id)
                }
            })
            socket.current.on('disonline',(arg)=>{
                setIncomingMessage(arg)
                console.log(arg)
            })
            socket.current.on('disconnect',()=>{
                console.log(socket.current.id)
            })
            console.log("test")
        }
    },[])

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
