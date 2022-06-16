import { Box, Button, Typography } from '@mui/material'

import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthenicationContext } from '../context/AuthContext'
import PostModal from '../pages/PostModal'

export default function Rightbar() {
  const{state} = useContext(AuthenicationContext)
  return (
    <Box flex = "2" sx={{display:'flex',padding:"10px",alignContent:'center',justifyContent:'center'}}>
      <Box position = "fixed" sx={{display:'flex',flexDirection:'column',gap:'5px'}}s>
        <Box  sx={{display:'flex',padding:"5px",alignItems:'center',gap:'5px'}}>
          <PostModal/>
          <Typography>New Post</Typography>
        </Box>
          <Link to = {`/profile/${state.user.name}`}>
            Profile
          </Link>
      </Box>        
    </Box>
  )
}
