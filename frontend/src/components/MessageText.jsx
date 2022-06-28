import { Box } from '@mui/material'
import React from 'react'

export default function MessageText(props) {
  return (
    <Box display='flex' justifyContent = {props.props.isYou?'flex-end':'flex-start'}>
        <Box sx={{maxWidth:'30vw',padding:'7px',borderRadius:'10px'}} 
          backgroundColor={props.props.isYou?'primary.main':'green'} color='white'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim
        </Box>
    </Box>
  )
}