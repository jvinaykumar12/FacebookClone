import { Button } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'

export default function ChatFriend(props) {
  const {details,selectName,selectedFriend} = props.props
  useEffect(()=>{
    console.log('test')
  },[selectedFriend._id])
  return (
    <Button variant='contained' onClick={()=>selectName(details)} color={props.id===selectedFriend._id?'primary':'secondary'}
    >{details.name}</Button>
  )
}
