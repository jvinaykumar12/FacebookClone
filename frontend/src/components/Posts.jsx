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

export default function Post(props) {

  const likeHandler = ()=>{
    
  }

  return (
    <>
      {/* <video controls name="media" crossOrigin="anonymous">
         <source  src={`http://localhost:3001/images/${props.props.image}`} type="video/mp4"/>
      </video> */}
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar> 
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="60%"
          image = {`http://localhost:3001/images/${props.props.image}`}
          alt="Paella dish"
          crossOrigin="anonymous"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Stack sx = {{flexDirection:"row"}}>
              <Checkbox onClick={likeHandler} icon={<ThumbUpOutlinedIcon />} checkedIcon = {<ThumbUpIcon/>} sx={{color:green[400]}}/>
              <Typography>{props.props.likes}</Typography>
            </Stack>
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
    
  );
}
