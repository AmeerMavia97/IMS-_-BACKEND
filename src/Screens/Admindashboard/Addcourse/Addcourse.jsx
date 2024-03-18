import { Box, Button, Card, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import KeepMountedModal from '../../../components/Modal';
import axios from 'axios';

const currencies = [
  {
    value: 'Monday ,Wednesday ,Friday',
    label: 'MWF',

  },
  {
    value: 'Tuesday , Thursday , Saturday',
    label: 'TTS',
  },
  {
    value: 'Sunday, Tuesday , Friday',
    label: 'STF',
  },
];


const Addcourse = () => {

    const [modal , setmodal] = useState(true)
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

  async function AddCourseInFirebase(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget);

    if (data.get('Teachername') === "" || data.get('Weekday') === "" || data.get('Coursename') === "") {
        setmodal(false)
        console.log('Please fill in all the required fields');
        return;
      }

    try {

        axios.post('http://localhost:3001/courses/addcourse' , {
            teacherName: data.get('Teachername'),
            weekDay: data.get('Weekday'),
            courseName: data.get('Coursename')  
        }).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })

        setmodal(true)


        
    } catch (error) {
        console.log(error);
        
    }
  }


  


  return (
    <>
      <Card  variant="outlined" sx={{ marginTop: 5, marginLeft: 35, marginRight: 62 }}>
        <Typography sx={{ textAlign: 'center', marginTop: 2 }} variant="h4">Add Course</Typography>

        <Box component="form" noValidate onSubmit={AddCourseInFirebase}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 3 }}>

            <TextField id="Teachername" name="Teachername" required label="Enter Teacher Name" variant="outlined" />
            <TextField sx={{ width: 216 }}
              required
              id="Weekday"
              name='Weekday'
              select
              label="Week days"
              value={inputValue}
              onChange={handleChange}
            >
              {currencies.map((option , index) => (
                <MenuItem key={index} value={option.label} >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField sx={{ marginTop: 2, marginLeft: 5, marginRight: 5, width: 460 }} fullWidth name='Coursename' required label="Course Name" id="Coursename" />
          <KeepMountedModal value={modal} /> 
         
          
        </Box>
      </Card>
    </>
  )
}

export default Addcourse