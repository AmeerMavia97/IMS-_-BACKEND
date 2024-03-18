import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AdminIdCard from '../../../components/AdminIdCard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';


const Singlestudent = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [Names , setNames] = useState()
  const [Email ,setEmail] = useState()
  const [Image , setImage] = useState()
  const [Address , setAddress] = useState()
  const [Course , setCourse] = useState()
  const [Gender , setGender] = useState()



  useEffect(() => {

    axios.get('http://localhost:3001/users/')
    .then((res)=>{
      res.data.data.map((item)=>{
        if(item._id === params.id){
          console.log(item);
          setNames(item.firstName + item.lastName)
          setEmail(item.email)
          setImage(item.img)
          setAddress(item.address)
          setGender(item.gender)
          setCourse(item.course[0])
        }
      })
    }).catch((err)=>{
      console.log(err);
    })
 
  }, [])




  return (
    <>
    <ArrowBackIosIcon onClick={()=>{navigate('/Admin/allstudent')}} sx={{color: 'black' , cursor:'Pointer'}}></ArrowBackIosIcon>
    <AdminIdCard email={Email} image={Image} names={Names} course={Course} address={Address} gender={Gender} /> <br />
           
    </>

  )
}

export default Singlestudent