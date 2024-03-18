import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CardActionArea, CardActions, CardMedia, CircularProgress } from '@mui/material';
import axios from 'axios';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Allcourse = () => {

  const navigate = useNavigate()
  const [Allcoursedata , setAllcoursedata] = useState([])


  useEffect(() => {

    try {
        axios.get('http://localhost:3001/courses/allcourse')
        .then((res)=>{
            setAllcoursedata(res.data.Data)
        }).catch((error)=>{
            console.log(error);

        })
    } catch (error) {
        
    }
   


  }, [])





  function handleChange(index){
    navigate(`/Admin/singlecourse/${index}`)
  }





  return (

    <>
     
    {Allcoursedata.length > 0 ?  Allcoursedata.map((item , index)=>{
      return(
        <Card key={index} onClick={()=>{handleChange(item._id)}} sx={{marginLeft: 46 , marginTop:1 , display: 'flex' ,  maxWidth: 290 }}>
        <CardActionArea>
        <CardContent>
          <Typography sx={{textAlign: 'center' , marginTop: 2}} gutterBottom variant="h5" component="div">
          {item.courseName}
          </Typography>
          <Typography sx={{textAlign: 'center' }}  variant="body2" color="text.secondary">
          {`Course By: ${item.teacherName}`} <br />
          </Typography>
          <Typography sx={{textAlign: 'center' , marginTop: 1 , marginBottom: 2}}  variant="body2" color="text.secondary">
          {`Day: ${item.weekDay}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

      )
    
    }) : <CircularProgress sx={{marginLeft: 65 , marginTop: 2}} /> 
  }




    </>
 
    
  );
}

export default Allcourse