import React, { useEffect, useState } from 'react'
import Drawer2 from '../../components/StudentPannelDrawer'
import StudentIdCard from '../../components/StudentIdCard'
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios';


const Student = () => {

  // NAVIGATION
  const navigate = useNavigate()
  const id = localStorage.getItem('uid')

  console.log(id);
  // STATES
  const [StudentName , setStudentName] = useState()
  const [StudentEmail , setStudentEmail] = useState()
  const [StudentCourse , setStudentCourse] = useState()
  const [StudentImage , setStudentImage] = useState()
  const [Gender , setGender] = useState()
  const [Address , setAddress] = useState()



  useEffect(()=>{
    function GetSpecificUser(){

      axios.get(`http://localhost:3001/users/${id}`)
      .then((res)=>{
        console.log(res.data.user);
        setStudentImage(res.data.user.img)
        setAddress(res.data.user.address)
        setGender(res.data.user.gender)
        setStudentCourse(res.data.user.course[0])
        setStudentEmail(res.data.user.email)
        setStudentName(res.data.user.firstName + res.data.user.lastName)
      }).catch((err)=>{
        console.log(err);
  
      })
  
    }
    GetSpecificUser()
  

  }, [])
  


console.log(StudentEmail);


  return (
    <>


      <Drawer2 />
      
      {<StudentIdCard/> ? <StudentIdCard  names={StudentName} email={StudentEmail} course={StudentCourse} image={StudentImage} gender={Gender} address={Address} /> : <CircularProgress disableShrink  />  }
    </>
  )
}

export default Student