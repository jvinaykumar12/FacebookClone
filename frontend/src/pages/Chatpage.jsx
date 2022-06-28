import { Box, Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import MessageText from '../components/MessageText'


export default function Chatpage() {
    const [freinds,setFriends] = useState([])
    const [userColumn,setUserColumn] = useState(['test'])
    const [friendColumn,setFriendColumn] = useState(['testd'])
  return (
    <Box>
        <Navbar/>
            <Stack direction='row' spacing={2} justifyContent='space-between' sx={{height:'90vh'}}>
                <Box flex = '1'>

                </Box>
                <Box flex='3' display='flex' flexDirection='column' gap='10px' padding='10px'>
                    <Box sx={{display:'flex',flexDirection:'column',gap:'20px',padding:'10px',overflow:'auto',overscrollBehavior:'contain'}}>
                        <MessageText props={{isYou:true}}/>
                        <MessageText props={{isYou:false}}/>
                        <MessageText props={{isYou:false}}/>
                        <MessageText props={{isYou:false}}/>
                        <MessageText props={{isYou:false}}/>
                        <MessageText props={{isYou:true}}/>
                        <MessageText props={{isYou:false}}/>
                        <MessageText props={{isYou:true}}/>
                        <MessageText props={{isYou:false}}/>                       
                    </Box>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px'}}>
                        <TextField multiline rows={3} sx={{width:'30vw'}}/>
                        <Button variant='contained'>SEND</Button>
                    </Box>
                </Box>
                
                <Box flex='1'>

                </Box>
            </Stack>
    </Box>
  )
}
