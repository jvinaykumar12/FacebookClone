import { Box } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {AuthenicationContext} from '../context/AuthContext'
import Post from './Posts'

export default function Feed(props) {

  const {state,profile} = useContext(AuthenicationContext)
  const [posts,setPosts] = useState([])
  

  useEffect(()=>{
    const tem = props.user ? axios.get(`/post/${props.user.userName}`):
    axios.get(`/post/timeline/${state.user._id}`)
    tem.then(res=> {
      if(!res.data.Iserror) {
        res.data.post.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt))
        setPosts(res.data.post)
      }
    })
  },[profile.name])


  return (
    <Box>
      {
        posts.map((e)=>
          <Post key = {e._id} props={e}></Post>
        )
      }
    </Box>
  )
}
