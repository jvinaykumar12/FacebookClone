import { Box, Typography } from '@mui/material'

import React from 'react'
import PostModal from '../pages/PostModal'

export default function Rightbar() {
  return (
    <Box flex = "2" sx={{display:'flex',padding:"10px",alignContent:'center',justifyContent:'center'}}>
      <Box position = "fixed" sx={{display:'flex',flexDirection:'column',gap:'5px'}}s>
        <Box  sx={{display:'flex',padding:"5px",alignItems:'center',gap:'5px'}}>
          <PostModal/>
          <Typography>New Post</Typography>
        </Box>
        <Typography>YOUR PROFILE</Typography>
      </Box>
        
    </Box>
  )
}
