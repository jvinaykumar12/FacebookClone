import { Home, Pages, Person } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { AuthenicationContext } from '../context/AuthContext'

export default function Sidebar() {

  const {dispatch} = useContext(AuthenicationContext)
  const logOut = ()=>{
    console.log('test')
    dispatch({type:"LOG_OUT"})
  }

  return (
    <Box flex = '1' >
      <Box position="fixed" sx={{display:{xs:"none",sm:"block"},width:"250px"}}>
       <List>
         <ListItem disablePadding >
            <ListItemButton>
              <ListItemIcon>
                <Home/>
              </ListItemIcon>
              <ListItemText primary="Inbox"/>
            </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Pages/>
              </ListItemIcon>
              <ListItemText primary="Pages"/>
            </ListItemButton>
         </ListItem>
         <ListItem disablePadding>
            <ListItemButton onClick={logOut}>
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary="LogOut"/>
            </ListItemButton>
         </ListItem>
         
       </List>
       </Box>
    </Box>
  )
}
