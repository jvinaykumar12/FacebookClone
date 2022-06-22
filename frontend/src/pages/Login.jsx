import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import apiCall from '../apiCall'
import {AuthenicationContext} from '../context/AuthContext'
export default function Login() {

  const {state,dispatch} = useContext(AuthenicationContext)

  const[formData,setformData] = useState({
    name:"",
    password:""
  })

  const defaultMessage = {
    name:{
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
    const defaultMessage = {
      name:{
        error:false,
        message:""
      },
      password:{
        error:false,
        message:""
      }
    }
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
      <form onSubmit={submitData}>
      <Stack  sx= {{
        alignItems:'center',
        padding:"20px",
        gap:"20px",
        margin:"10px"
      }}>
        <Typography>LOGIN</Typography>

        <TextField  label="name" variant="outlined" type="text" name="name" 
        error={errorMessage.name.error}  helperText={errorMessage.name.message} onChange={updateForm} sx={{width:"30%"}}/>

        <TextField  label="Password" variant="outlined" type="text" name="password"
        error={errorMessage.password.error}  helperText={errorMessage.password.message} onChange={updateForm} sx={{width:"30%"}}/>

        <Button sx={{width:"100px"}}type = "submit" variant='contained' color='primary' disabled={state.isLoading}> 
          {state.isLoading? <CircularProgress sx={{color:"white"}} size="25px"/>:"LOGIN"}
        </Button>
        <Stack spacing={1} alignItems='center' direction="row">
            <Typography>New User?</Typography>
            <Link to = '/register'>SIGNUP</Link>
        </Stack>
      </Stack>
      </form>
    </>
  )
}