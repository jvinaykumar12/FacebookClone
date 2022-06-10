import { Box, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Feed from '../components/Feed'
import Navbar from '../components/Navbar'
import Rightbar from '../components/Rightbar'
import Sidebar from '../components/Sidebar'

export default function Home() {


  return (
    <Box>
        <Navbar/>
            <Stack direction='row' spacing={2} justifyContent='space-between' >
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </Stack>
            <Link to = '/login'>test</Link>
    </Box>
  )
}
