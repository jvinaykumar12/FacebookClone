import { Notifications, SearchTwoTone } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { AppBar, Avatar, Badge, Box, styled, TextField, Toolbar, Typography } from '@mui/material'
import axios from 'axios';
 import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenicationContext } from '../context/AuthContext';

export default function Navbar() {


  const {state,profile,setProfile}  = useContext(AuthenicationContext)
  const navigate = useNavigate()

  const CustomizedIcon = styled("div")(({theme})=>({
      display:'flex',
      gap : "20px"
  }))
  const [searchData,setSearchData] = useState('')

  const updateSearch = (e)=>{
    setSearchData(e.target.value)
  }

  const sendData = ()=>{
    if(profile.name!==searchData) {
      axios.get(`/users/${searchData}`)
      .then((res)=>{
          setProfile({
            name:res.data.name,
            id:res.data._id,
            isLoading:true
          })
      })
    }
  
  }

  const toHome = ()=>{
    setProfile({name:'',id:'',isLoading:false})  
    navigate('/')
  }

  const toChat = ()=>{
    navigate('/chat')
  }

  useEffect(()=>{
    if(searchData) navigate('/profile',{replace:true})
  },[profile.name])


  return (
    <AppBar position='sticky' sx={{height:'10vh'}}>
        <Toolbar sx={{display : 'flex',justifyContent: 'space-between'}}>
            <Typography onClick={toHome} sx={{display:{xs:'none',sm:'block'}}}>Social Media</Typography>
            <Box sx={{display:'flex',alignItems:'center',alignContent:'center',gap:'5px'}}>
                <TextField onChange={updateSearch} value = {searchData} sx={{backgroundColor:'white',borderRadius:'5px'}} size='small'/>
                <SearchTwoTone onClick={sendData}/>
            </Box>
            <CustomizedIcon>
                <Badge badgeContent = {0} onClick={toChat} color="secondary">
                    <EmailIcon></EmailIcon>
                </Badge>
                <Badge badgeContent = {0} sx={{display:{xs:'none',sm:'block'}}}  color="secondary">
                    <Notifications/>
                </Badge>
                <Avatar onClick={toHome} src={require('./test.png')} sx={{height:"30px",width:"30px"}}></Avatar>
            </CustomizedIcon>
        </Toolbar>
    </AppBar>
  )
}
