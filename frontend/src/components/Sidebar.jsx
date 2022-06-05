import { Home, Pages, Person } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

export default function Sidebar() {
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
            <ListItemButton>
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary="Friends"/>
            </ListItemButton>
         </ListItem>
         
       </List>
       </Box>
    </Box>
  )
}
