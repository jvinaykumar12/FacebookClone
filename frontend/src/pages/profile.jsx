import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Feed from '../components/Feed'
import Friendbar from '../components/Friendbar'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { AuthenicationContext } from '../context/AuthContext'

export default function Profile(props) {


  const {state,profile,setProfile} = useContext(AuthenicationContext)
  const [followingList,setFollowingList] = useState([])
  const [isFollowing,setIsFollowing] = useState({
    isStart:true,
    isFollowing:false
  })

  let userName = profile.name
  let userId = profile.id
  if(!userName) {
    userName = state.user.name
    userId = state.user._id
  }

  const followUser = (e)=>{
    const temp = e ? axios.put(`/users/follow/${e}`,{
      id:state.user._id,
    }):
    axios.put(`/users/follow/${profile.name}`,{
      id:state.user._id,
    })
    console.log(profile.name)
    temp
    .then(res=>{
      if(!e) {
        setIsFollowing({
          isStart:false,
          isFollowing:true
        })
      }  
    })
  }

  const unFollowUser = (e)=>{
    const temp = e ? axios.put(`/users/unfollow/${e}`,{
      id:state.user._id
    }):
    axios.put(`/users/unfollow/${profile.name}`,{
      id:state.user._id
    })
    console.log(profile.name)
    temp
    .then(res=>{
      console.log(res.data)
      if(!e) {
        setIsFollowing({
          isStart:false,
          isFollowing:false
        })
      }
    })
  }

  useEffect(()=>{
    let temp = []
    axios.get(`/users/${state.user.name}`)
    .then(res=>{
      temp = res.data.following
      return (axios.get(`/users/friendList/${userId}`))
    })
    .then(res=>{
      const r = []
      console.log(res.data)
      res.data.forEach(e=>{
        const check = temp.includes(e.id)
        r.push(<Friendbar key={e.id} props = {{followUser,e,unFollowUser,isFollowing:check?true:false}}/>)
      })
      if(temp.includes(profile.id)) {
        setIsFollowing({
          isStart:false,
          isFollowing:true
        })
      }
      else {
        setIsFollowing({
          isStart:false,
          isFollowing:false
        })
      }
      setProfile({
        ...profile,
        isLoading:false
      })
      setFollowingList(r)
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
                      <Button sx={{width:'200px'}} onClick={()=>unFollowUser()}>
                          Unfollow {profile.name}
                      </Button>:
                      <Button sx={{width:'200px'}} onClick={()=>followUser()}>
                          Follow {profile.name}
                      </Button> 
                    }
                    <Box sx={{display:'flex',gap:'5px',flexDirection:'column'}}>
                      {followingList}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Stack>          
        </Stack>
    </Box>
  )
}
