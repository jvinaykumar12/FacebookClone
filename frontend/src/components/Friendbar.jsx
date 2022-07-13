import { Add, Remove } from '@mui/icons-material'
import { Box, Button, Fab, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

export default function Friendbar(props) {

  const {isFollowing,followUser,unFollowUser,e} = props.props
  const [toggle,setToggle] = useState(isFollowing)


  return (
    <Box sx={{display:'flex',gap:'10px',alignItems:'center',alignContent:'center'}}>
      <Typography>{e.name}</Typography>
      {
        toggle?
        <Fab size="small" variant='extended' sx = {{display:'flex',gap:'5px',alignItems:'center',alignContent:'center',backgroundColor:'white'}} onClick={()=>{unFollowUser(e.name); setToggle(false)}}>
          <Remove />
          <Typography>UNFOLLOW</Typography>
        </Fab>:
        <Fab size="small" variant='extended' sx = {{display:'flex',gap:'5px',alignItems:'center',alignContent:'center',backgroundColor:'green'}} onClick={()=>{followUser(e.name); setToggle(true)}}>
          <Add />
          <Typography>FOLLOW</Typography>
        </Fab>
      }
    </Box>
  )

}
