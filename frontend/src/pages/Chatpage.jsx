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
    const [selectedFriend,setSelectedFriend] = useState(profile.name)
    const [freinds,setFriends] = useState([])
    const [userColumn,setUserColumn] = useState(['test'])
    const [friendColumn,setFriendColumn] = useState(['testd'])
    const [message,setMessage] = useState('')

    const updateMessage = (e)=>{ 
        setMessage(e.target.value)
    }

    const sendMessage = (e)=>{
        e.preventDefault()
        
    }

    useEffect(()=>{
        axios.get(`/conversation/list/${state.user._id}`)
        .then(res=>{
            const temp = []
            res.data.forEach(e=>{
                temp.push(<Button>{e.name}</Button>)
            })
            setFriendColumn(temp)
        })
    },[])

  return (
    <Box>
        <Navbar/>
            <Stack direction='row' spacing={2} justifyContent='space-between' sx={{height:'90vh'}}>
                <Box flex = '1' display='flex' flexDirection='column' gap='10px' padding='10px'>
                    {friendColumn}
                </Box>
                <Box flex='3' display='flex' flexDirection='column' gap='10px' padding='10px'>
                    <Box sx={{display:'flex',flexDirection:'column',gap:'20px',padding:'10px',minHeight:'50vh' ,overflow:'auto',overscrollBehavior:'contain'}}>
                                              
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
                        <TextField multiline rows={3} sx={{width:'30vw'}} onChange={updateMessage} value={message}/>
                        <Button variant='contained'>SEND</Button>
                    </Box>
                </Box>
                
                <Box flex='1'>

                </Box>
            </Stack>
    </Box>
  )
}
