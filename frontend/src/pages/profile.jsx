import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Feed from '../components/Feed'
import Friendbar from '../components/Friendbar'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { AuthenicationContext } from '../context/AuthContext'

export default function Profile() {


  const {state,profile,setProfile} = useContext(AuthenicationContext)
  const [followingList,setFollowingList] = useState([])
  const [isFollowing,setIsFollowing] = useState(false)
  const [isProfileFollowing,setIsProfileFollowing] = useState(false)
  const navigate = useNavigate()

  let userName = profile.name
  let userId = profile.id
  if(!userName) {
    userName = state.user.name
    userId = state.user._id
  }

  const followUser = (e)=>{
    if(e!==state.user.name) {
        const temp = e ? axios.put(`/users/follow/${e}`,{
          id:state.user._id,
        }):
        axios.put(`/users/follow/${profile.name}`,{
          id:state.user._id,
          name:state.user.name
        })
        console.log(profile.name)
        temp
        .then(res=>{
          if(!e) {
            setIsFollowing(true)
          }  
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }

  const unFollowUser = (e)=>{
    const temp = e ? axios.put(`/users/unfollow/${e}`,{
      id:state.user._id
    }):
    axios.put(`/users/unfollow/${profile.name}`,{
      id:state.user._id
    })
    temp
    .then(res=>{
      if(!e) {
        setIsFollowing(false)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const redirectToChat = (e)=>{
    axios.get(`/conversation/isExists/${profile.id}/${state.user._id}`)
    .then(()=>{
        navigate(`/chat`) 
    })
  }

  useEffect(()=>{
    let temp = []
    let isFollowingState = false
    axios.get(`/users/${state.user.name}`)
    .then(res=>{
      temp = res.data.following
      return (axios.get(`/users/friendList/${userId}`))
    })
    .then(res=>{
      const r = []
      res.data.forEach(e=>{
        const check = temp.includes(e.id)
        if(e.name===state.user.name) isFollowingState = true
        else {
          r.push(<Friendbar key={e.id} props = {{followUser,e,unFollowUser,isFollowing:check?true:false}}/>)
        }
      })
      if(temp.includes(profile.id)) {
        setIsFollowing(true)
      }
      else {
        setIsFollowing(false)
      }
      setProfile({
        ...profile,
        isLoading:false
      })
      setFollowingList(r)
      if(isFollowingState) {
        setIsProfileFollowing(true)
      }
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
                <Grid item xs={8}>
                  <Feed flex = "4" user = {{userName:userName}}/>                
                </Grid>
                <Grid item xs ={4} >
                  <Box position='fixed' sx={{padding:"10px",display:'flex',flexDirection:'column',gap:'10px',
                                            alignContent:'center',alignItems:'center'}}>

                    <Box>
                      {isProfileFollowing && <Typography>{profile.name} is Following you</Typography>}
                    </Box>
                    <Box>
                      {
                        !profile.name || profile.name===state.user.name?
                        <Button>
                            EDIT PROFILE
                        </Button>:  
                        profile.isLoading?
                        <></>:
                        isFollowing?
                        <Button  onClick={()=>unFollowUser()}>
                            Unfollow {profile.name}
                        </Button>:
                        <Button  onClick={()=>followUser()}>
                            Follow {profile.name}
                        </Button> 
                      }
                    </Box>
                    <Box>
                      {(profile.name!==state.user.name && profile.name) && <Button onClick={redirectToChat}>MESSAGE {profile.name}</Button>}
                    </Box>
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
