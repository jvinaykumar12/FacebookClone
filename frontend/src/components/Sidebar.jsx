import { Home, Pages, Person } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenicationContext } from '../context/AuthContext'

export default function Sidebar() {

  const navigate = useNavigate()
  const setProfile = useContext(AuthenicationContext).setProfile
  const {dispatch} = useContext(AuthenicationContext)
  const logOut = ()=>{
    console.log('test')
    dispatch({type:"LOG_OUT"})
  }

  const toHome = ()=>{
    setProfile({name:'',id:'',isLoading:false})  
    navigate('/')
  }

  return (
    <Box flex = '1' >
      <Box position="fixed" sx={{display:{xs:"none",sm:"block"}}}>
       <List>
         <ListItem disablePadding >
            <ListItemButton onClick={toHome}>
              <ListItemIcon>
                  <Home/>
              </ListItemIcon>
              <ListItemText primary="Home"/>
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
