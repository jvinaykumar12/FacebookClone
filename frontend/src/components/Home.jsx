import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {


  const[formData,setformData] = useState({
      name:"",
      userId:"",
      password:""
  })
  const [errorMessage,seterrorMessage] = useState({
      toggle:false,
      content:""
  })


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
    seterrorMessage({
        toggle:false,
        content:""
    })
      console.log(formData)
      e.preventDefault()
      axios.post('http://localhost:3001/auth/register',formData)
      .then(res=>{
        if(res.data.isError) {
            seterrorMessage({
                toggle:true,
                content:"Username exists"
            })
        }
      })

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
        <TextField id="outlined-basic" label="Name" variant="outlined" type="text" name="name" error={errorMessage.toggle}  helperText={errorMessage.content}
        onChange={updateForm} sx={{width:"30%"}} />
        <TextField id="outlined-basic" label="UserId" variant="outlined" type="text" name="userId" onChange={updateForm} sx={{width:"30%"}}/>
        <TextField id="standard-basic" label="Password" variant="outlined" type="text" name="password" onChange={updateForm} sx={{width:"30%"}}/>
        <Button type="submit" variant='contained' color='primary'>CREATE</Button>
        <Stack spacing={1} alignItems='center' direction="row">
            <Typography>Already a User?</Typography>
            <Link to = '/login'>LOGIN</Link>
        </Stack>
    </Stack>   
    </form>
  )
}
