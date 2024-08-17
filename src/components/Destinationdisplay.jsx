import React , {useContext} from 'react'
import {Card ,CardActions,CardContent,CardMedia,Button,Typography}from '@mui/material';
import AuthContext from '../context/AuthContext';
import Addtravel from './travelplan/Addtravel';


function Destinationdisplay({data}) {
  const {user}=useContext(AuthContext);
  const handleClick=()=>{
    user?window.location.href="/travelplan/":window.location.href="/login"
  }
  return (
    <>
    <Button onClick={()=>{
      var a=data.title.toLowerCase().replace(/\s/g,'').split(',');
      //console.log(a[0])
      user?(()=>{return(<>
        {window.location.href=`/addtravel`}</>
      )}):window.location.href="/login"
      // user?window.location.href=`/addtravel/${a[0]}}`:window.location.href="/login"
    }}>
    <Card sx={{ maxWidth: 345 }}>
    <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={data.images[0]} />      
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={data.reference} target="_blank"><Button size="small" >Learn More</Button></a>
      </CardActions>
    </Card>
    </Button>
    
    </>
  )
}

export default Destinationdisplay

