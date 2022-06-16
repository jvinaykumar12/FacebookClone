import { Avatar, Box, Grid, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import { AuthenicationContext } from '../context/AuthContext'

export default function Profile(props) {

  
  const {state,profile} = useContext(AuthenicationContext)
  let userName = profile
  if(!userName) userName = state.user.name
  console.log(userName)
  return (
    <Box>
        <Navbar/>
        <Stack direction='row' spacing={2} justifyContent='space-between' >
            <Sidebar/>
            <Stack direction='column' spacing={2} alignItems='center' flex='4'>
              <Grid container spacing={1}>
                <Grid item xs={12} sx={{display:'flex',alignContent:'center',flexDirection:'column',alignItems:'center'}}>
                  <Avatar src={require('./test.png')} sx={{height:"160px",width:"160px"}}></Avatar>
                  <Typography>Iam a bird swimming in internet</Typography>  
                </Grid>
                <Grid item xs={7}>
                  <Feed flex = "4" user = {{userName:userName}}/>                
                </Grid>
                <Grid item xs ={5}>
                  <Rightbar/>
                </Grid>
              </Grid>
            </Stack>          
        </Stack>
    </Box>
  )
}
