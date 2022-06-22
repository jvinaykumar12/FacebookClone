import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'
import { AuthenicationContext } from '../context/AuthContext'

export default function Profile(props) {


  const {state,profile,setProfile} = useContext(AuthenicationContext)
  const [isFollowing,setIsFollowing] = useState({
    isStart:true,
    isFollowing:false
  })
  let userName = profile.name
  if(!userName) {
    userName = state.user.name
  }
  console.log(isFollowing)

  const followUser = ()=>{
    axios.put(`/users/follow/${profile.name}`,{
      id:state.user._id,
    })
    .then(res=>{
      setIsFollowing({
        isStart:false,
        isFollowing:true
      })  
      console.log(res.data) 
    })
  }

  const unFollowUser = ()=>{
    axios.put(`/users/unfollow/${profile.name}`,{
      id:state.user._id
    })
    .then(res=>{
      console.log(res.data)
      setIsFollowing({
        isStart:false,
        isFollowing:false
      })
    })
  }

  useEffect(()=>{
    axios.get(`/users/${state.user.name}`)
    .then(res=>{
      if(res.data.following.includes(profile.id)) {
        setIsFollowing({
          isStart:false,
          isFollowing:true
        })
      }else {
        setIsFollowing({
          isStart:false,
          isFollowing:false
        })
      }
      setProfile({
        ...profile,
        isLoading:false
      })
    })
  },[profile.name])
  
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
                <Grid item xs ={5} sx = {{display:'flex',flexDirection:'column',alignContent:'center',alignItems:'center'}}>
                  <Box sx={{padding:"20px"}} position='fixed'>
                    {
                      !profile.name || profile.name===state.user.name?
                      <Button>
                          EDIT PROFILE
                      </Button>:  
                      profile.isLoading?
                      <></>:
                      isFollowing.isFollowing?
                      <Button sx={{width:'200px'}} onClick={unFollowUser}>
                          Unfollow {profile.name}
                      </Button>:
                      <Button sx={{width:'200px'}} onClick={followUser}>
                          Follow {profile.name}
                      </Button> 
                    }
                    <Stack>

                    </Stack>
                    
                    
                  </Box>
                </Grid>
              </Grid>
            </Stack>          
        </Stack>
    </Box>
  )
}
