import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppBar, Avatar, CircularProgress, Container, Toolbar, Tooltip } from '@mui/material';
import axios from 'axios';



const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);



const Singlecourse = () => {

    const params = useParams()
    const [Coursename, setCoursename] = useState()
    const [Teachername, setTeachername] = useState()
    const [Day, setDay] = useState()
    const [StudentList, setStudentList] = useState([])

    useEffect(() => {

        try {
            axios.get('http://localhost:3001/courses/allcourse')
                .then((res) => {
                   
                    res.data.Data.map((item) => {
                        if (item._id === params.id) {
                            setCoursename(item.courseName)
                            setTeachername(item.teacherName)
                            setDay(item.weekDay)
                            return
                        }

                    })

                })
                .catch((err) => {
                    console.log(err);

                })
        } catch (error) {
            console.log(error);

        }




    }, [])


    useEffect(() => {

        try {
            axios.get('http://localhost:3001/users/')
                .then((res) => {
                    let copy = [];
                    console.log(res.data.data);
                    res.data.data.map((item)=>{
                        if(item.type === 'student'){
                            if(item.course[0] === Coursename){
                                copy.push(item)
                                return
                            }

                            
                        }

                    })
                    setStudentList(copy)
                   

                }).catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }


    }, [Coursename])








    return (
        <>
            {Coursename ? <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ textAlign: 'center', mb: 1.5 }} variant="h4" component="div">
                        {Coursename}
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }} color="text.secondary">
                        {`Coursed by: ${Teachername}`}
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }} variant="body2">
                        {`Day: ${Day}`}
                    </Typography>
                </CardContent>

            </Card> : <CircularProgress sx={{ marginLeft: 65, marginTop: 2 }} />}

            {StudentList.length > 0 ?
                StudentList.map((item, index) => {
                    return (
                        <>
                            <AppBar key={index} position="static" sx={{ marginBottom: 2, marginTop: 2 }}>
                                <Container sx={{ display: 'flex', justifyContent: 'space-between' }} maxWidth="xl">
                                    <Toolbar disableGutters>
                                        <Typography
                                            key={index}
                                            variant="h6"
                                            noWrap
                                            component="a"
                                            sx={{
                                                ml: 2,
                                                display: { xs: 'none', md: 'flex' },

                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: 'inherit',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            {item.firstName + item.lastName}
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
                                </Container>

                            </AppBar>




                        </>
                    )
                })

                : <Typography variant='h5' sx={{ textAlign: 'center', marginTop: 3 }}>Student Are Not Available In This Course</Typography>}

        </>
    )
}

export default Singlecourse