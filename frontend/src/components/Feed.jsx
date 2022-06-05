import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from './Posts'

export default function Feed(props) {

  const [posts,setPosts] = useState([])
  console.log(props.user.userName)

  useEffect(()=>{
    console.log("test")
    console.log(posts)
    //  props.user.userName?
     axios.get(`/post/${props.user.userName}`)
    //  :axios.get(`post/timeline/${props.user.userName}`)
    .then(res=> {
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
