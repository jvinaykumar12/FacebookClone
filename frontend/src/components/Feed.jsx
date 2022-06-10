import { Box } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {AuthenicationContext} from '../context/AuthContext'
import Post from './Posts'

export default function Feed(props) {

  const {state} = useContext(AuthenicationContext)
  const [posts,setPosts] = useState([])
  

  useEffect(()=>{
    console.log("test")
    console.log(posts)
    const tem = props.user ? axios.get(`/post/${props.user.userName}`):
    axios.get(`/post/${state.user.name}`)
    tem.then(res=> {
      if(!res.data.Iserror) {
        console.log(res.data.post)
        setPosts(res.data.post)
      }
    })
  },[])

  return (
    <Box>
      {
        posts.map((e)=>
          <Post key = {e._id} props={{likes:e.likes.length,userId:e.userId}}></Post>
        )
      }
    </Box>
  )
}
