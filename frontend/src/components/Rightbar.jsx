import { Box, Button, Typography } from '@mui/material'

import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthenicationContext } from '../context/AuthContext'
import PostModal from '../pages/PostModal'

export default function Rightbar() {
  const{setProfile,state} = useContext(AuthenicationContext)
  const [toggle,setToggle] = useState(false)
  const navigate = useNavigate()

  const redirectToProfile = ()=>{
      setProfile(state.user.name)
      setToggle(true)      
  }

  useEffect(()=>{
    if(toggle) navigate('/profile')
  },[toggle])

  return (
    <Box flex = "2" sx={{display:'flex',padding:"10px",alignContent:'center',justifyContent:'center'}}>
      <Box position = "fixed" sx={{display:'flex',flexDirection:'column',gap:'5px'}}s>
        <Box  sx={{display:'flex',padding:"5px",alignItems:'center',gap:'5px'}}>
          <PostModal/>
          <Typography>New Post</Typography>
        </Box>
        <Button onClick={redirectToProfile}>
            Your Profile
        </Button>  
      </Box>        
    </Box>
  )
}
