import {Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {


  const[formData,setformData] = useState({
      name:"",
      password:"",
      passwordCheck:""

  })

  const defaultMessage = {
    name:{
      error:false,
      message:""
    },
    passwordCheck:{
      error:false,
      message:""
    }
  }

  const [errorMessage,setErrormessage] = useState(defaultMessage)


  const updateForm = (e)=>{
      setformData((data)=>{
          const temp = {
              ...data,
              [e.target.name]:e.target.value
          }
          return temp
      })
  }
  
  const submitForm = (e)=> {
      e.preventDefault()     
      setErrormessage(defaultMessage)
      if(formData.password !== formData.passwordCheck) {
          setErrormessage({
              ...defaultMessage,
              passwordCheck:{
                  error:true,
                  message:"password Not matching"
              }
          })
      }
      else {
        axios.post('http://localhost:3001/auth/register',formData)
            .then(res=>{
                if(res.data.isError) {
                    setErrormessage({
                        ...defaultMessage,
                        name:{
                        error:true,
                        message:"name already Exist"
                        }
                    })
                }
            })
      }
      

  }

  return (
    <form onSubmit={submitForm}>
    <Stack  sx= {{
        alignItems:'center',
        padding:"20px",
        gap:"20px",
        margin:"10px",
    }}>
        <Typography>CREATE ACCOUNT</Typography>

        <TextField  label="name" variant="outlined" type="text" name="name" error={errorMessage.name.error}  helperText={errorMessage.name.message}
        onChange={updateForm} sx={{width:"30%"}} />

        <TextField  label="Password" variant="outlined" type="text" name="password" onChange={updateForm} sx={{width:"30%"}}/>

        <TextField  label="PasswordCheck" variant="outlined" type="text" name="passwordCheck" onChange={updateForm} error={errorMessage.passwordCheck.error}
        helperText={errorMessage.passwordCheck.message} sx={{width:"30%"}}/>

        <Button type="submit" variant='contained' color='primary'>CREATE</Button>
        <Stack spacing={1} alignItems='center' direction="row">
            <Typography>Already a User?</Typography>
            <Link to = '/login'>LOGIN</Link>
        </Stack>
    </Stack>   
    </form>
  )
}
