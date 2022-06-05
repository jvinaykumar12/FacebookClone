import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Container, maxWidth } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiCall from '../apiCall'
import {AuthenicationContext} from '../context/AuthContext'
import Navbar from './Navbar'
export default function Login() {

  const {state,dispatch} = useContext(AuthenicationContext)

  const[formData,setformData] = useState({
    userId:"",
    password:""
  })

  const defaultMessage = {
    userId:{
      error:false,
      message:""
    },
    password:{
      error:false,
      message:""
    }
  }
  const [errorMessage,setErrormessage] = useState(defaultMessage)

  useEffect(()=>{
    if(state.error) {
      console.log(state.error)
      setErrormessage({
        ...defaultMessage,
        [state.error.error]:{
          error:true,
          message:state.error.error+"wrong"
        }
      })
    }
  },[state.error])
  


  const updateForm = (e)=>{
      setErrormessage(defaultMessage)
      setformData((data)=>{
          const temp = {
              ...data,
              [e.target.name]:e.target.value
          }
          return temp
      })
  }

  const submitData = (e)=>{
    e.preventDefault()
    apiCall(formData,dispatch)
  }

  return (
    <>
      <Navbar></Navbar>
      <form onSubmit={submitData}>
      <Stack  sx= {{
        alignItems:'center',
        padding:"20px",
        gap:"20px",
        margin:"10px"
      }}>
        <Typography>LOGIN</Typography>

        <TextField id="outlined-basic" label="UserId" variant="outlined" type="text" name="userId" 
        error={errorMessage.userId.error}  helperText={errorMessage.userId.message} onChange={updateForm} sx={{width:"30%"}}/>

        <TextField id="standard-basic" label="Password" variant="outlined" type="text" name="password"
        error={errorMessage.password.error}  helperText={errorMessage.password.message} onChange={updateForm} sx={{width:"30%"}}/>

        <Button sx={{width:"100px"}}type = "submit" variant='contained' color='primary' disabled={state.isLoading}> 
          {state.isLoading? <CircularProgress sx={{color:"white"}} size="25px"/>:"LOGIN"}
        </Button>
        <Stack spacing={1} alignItems='center' direction="row">
            <Typography>New User?</Typography>
            <Link to = '/'>SIGNUP</Link>
        </Stack>
      </Stack>
      </form>
    </>
  )
}