import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, lightGreen, red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Checkbox, Stack } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useContext } from 'react';
import { AuthenicationContext } from '../context/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import { Box } from '@mui/system';


export default function Post(props) {
  const {state} = useContext(AuthenicationContext)
  const [toggleLike,setToggleLike] = useState(props.props.likes.includes(state.user._id))
  const [likeCount,setLikeCount] = useState(props.props.likes.length)
  const [toggleCheckBox,setToggleCheckBox] = useState(false)

  const likeHandler = ()=>{
    setToggleCheckBox(true)
    axios.put(`post/${props.props._id}/like`,{id:state.user._id})
    .then((res)=>{
      if(toggleLike) setLikeCount(likeCount-1)
      else setLikeCount(likeCount+1)
      setToggleLike(prev=>(!prev)) 
      setToggleCheckBox(false)    
    })
    .catch(e=>{
      console.log(e)
    })
  }

  return (
    <>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {props.props.name?props.props.name.charAt(0):'Q'  }
            </Avatar> 
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.props.name}
          subheader={(new Date(props.props.createdAt)).toDateString()}
        />
        <CardMedia
          component="img"
          height="60%"
          image = {`https://socialmedia.azurewebsites.net/images/${props.props.image}`}
          crossOrigin="anonymous"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Stack direction={'row'}>
            <IconButton disabled={toggleCheckBox} onClick={likeHandler}>
              {toggleLike?<ThumbUpIcon sx={{color:"green"}}/>
              :<ThumbUpOutlinedIcon sx={{color:"gray"}}/>}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Stack>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
    
  );
}
