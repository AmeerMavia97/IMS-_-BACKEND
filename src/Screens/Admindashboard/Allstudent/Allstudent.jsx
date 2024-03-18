import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Singlestudent from '../Singlestudent/Singlestudent';
import { CircularProgress } from '@mui/material';
import axios from 'axios';


function Allstudent() { 

  const navigate = useNavigate()
  const [AllStudentdata , setAllStudentdata] = useState([])


async  function deleteStudent(index , id){
  console.log('hello');
  axios.delete(`http://localhost:3001/users/deleteusers${id}`)
  .then((res)=>{
    console.log(res.data);
  }).catch((err)=>{
    console.log(err);

  })
    
    AllStudentdata.splice(index, 1)
    setAllStudentdata([...AllStudentdata])
  }



  useEffect(()=>{

    function GetAllstudent(){
      axios.get('http://localhost:3001/users/')
      .then((res)=>{
        let copy = [];
        res.data.data.map((item)=>{
          if(item.type === 'student'){
            copy.push(item)        
           return
          }
        })
        console.log(copy);
        setAllStudentdata(copy)
      }).catch((err)=>{
        console.log(err);
  
      })
        
      }
      GetAllstudent()
      console.log(AllStudentdata);

  },[])
  


  function handlechange(index){
    console.log(index);
    navigate(`/Admin/singlestudent/${index}`)
  

  }


  return (
    <>
    {AllStudentdata.length > 0 ? AllStudentdata.map((item , index)=>{
      return(
        <>
      <AppBar key={index}  position="static" sx={{marginBottom: 2 }}>
      <Container  sx={{display: 'flex',  justifyContent: 'space-between' }} maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
            <Avatar alt="Remy Sharp" src={item.img} />
            </Tooltip>
          </Box>
          <Typography
          onClick={()=>{handlechange(item._id)}} 
          key={item._id}
            variant="h6"
            noWrap
            component="a"
            sx={{
              ml: 2,
              display: { xs: 'none', md: 'flex'  },
              
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {item.firstName + item.lastName } 
          </Typography>
          {/* <Typography
          key={index}

            variant="h5"
            noWrap
            component="a"
            sx={{
              ml: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {item.FirstName + item.LastName} 
            
          </Typography> */}


          
        </Toolbar>
       <DeleteIcon key={index} onClick={()=>{deleteStudent(index , item._id)}} sx={{ display: { xs: 'flex',   } , marginTop: 2  }} /> 

      </Container>

    </AppBar>




    </>
      )
    }) : <CircularProgress sx={{marginLeft: 65 , marginTop: 2}} />  
  }
    </>
  );
}
export default Allstudent;