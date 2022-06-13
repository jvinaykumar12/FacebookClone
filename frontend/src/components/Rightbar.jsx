import { Box, Typography } from '@mui/material'

import React from 'react'
import PostModal from '../pages/PostModal'

export default function Rightbar() {
  return (
    <Box flex = "2">
      <Box sx={{display:'flex'}}>
        <PostModal/>
        <Typography>New Post</Typography>
      </Box>
    </Box>
  )
}
