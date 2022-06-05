import { Notifications } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { AppBar, Avatar, Badge, InputBase, styled, Toolbar, Typography } from '@mui/material'
import { padding } from '@mui/system';
 import React from 'react'

export default function Navbar() {


  const CustomizedToolbar = styled(Toolbar)({
      display : 'flex',
      justifyContent: 'space-between'
  })

  const CustomizedSearch = styled("div")(({theme})=>({
    backgroundColor : "white",
    width:"20%",
    borderRadius : theme.shape.borderRadius,
    padding: '5px'
  }))

  const CustomizedIcon = styled("div")(({theme})=>({
      display:'flex',
      gap : "20px"
  }))


  return (
    <AppBar position='sticky' >
        <CustomizedToolbar>
            <Typography>Social Media</Typography>
            <CustomizedSearch sx={{display:{xs:'none',sm:'block'}}}><InputBase placeholder='Search'/></CustomizedSearch>
            <CustomizedIcon>
                <Badge badgeContent = {4} color="secondary">
                    <EmailIcon></EmailIcon>
                </Badge>
                <Badge badgeContent = {1} color="secondary">
                    <Notifications/>
                </Badge>
                <Avatar src={require('./test.png')} sx={{height:"30px",width:"30px"}}></Avatar>
            </CustomizedIcon>
        </CustomizedToolbar>
    </AppBar>
  )
}
