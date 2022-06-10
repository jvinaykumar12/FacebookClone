import { Avatar, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'

export default function Profile() {

  const userName = useParams().username
  console.log(userName)
  return (
    <Box>
        <Navbar/>
        <Stack direction='row' spacing={2} justifyContent='space-between' >
            <Sidebar/>
            <Stack direction='column' spacing={2} alignItems='center' flex='4'>
                <Avatar src={require('./test.png')} sx={{height:"160px",width:"160px"}}></Avatar>
                <Typography>Iam a bird swimming in internet</Typography>
                <Stack direction='row' spacing={4} justifyContent='space-between'>
                    <Feed flex = "4" user = {{userName:userName}}/>
                    <Rightbar/>
                </Stack>
            </Stack>          
        </Stack>
    </Box>
  )
}
