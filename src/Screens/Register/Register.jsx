import * as React from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../../config/Firebase/config'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();


export default function Register() {
    const navigate = useNavigate()

    // const names = [];
    const [namess, setnames] = React.useState([])



    React.useEffect(() => {

        try {
            axios.get('http://localhost:3001/courses/allcourse')
                .then((res) => {

                    const copyList = []
                    res.data.Data.map((item) => {
                        copyList.push(item.courseName)
                    })

                    setnames([...copyList])

                }).catch((error) => {
                    console.log(error);

                })
        } catch (error) {

        }


    }, [])
    console.log(namess);

    const [personName, setPersonName] = React.useState([]);
    const theme = useTheme();


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    // createUserWithEmailAndPassword(auth, data.get('email'), data.get('password'))
    // .then((userCredential) => {
    //   uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log("Done");
    //     getDownloadURL(storageRef)
    //       .then((url) => {
    //         console.log(url);
    //         try {
    //           addDoc(collection(db, "AdmissionForm"), {
    //             FirstName: data.get('firstName'),
    //             LastName: data.get('lastName'),
    //             Email: data.get('email'),
    //             Address: data.get('address'),
    //             Course: personName[0],
    //             Gender: data.get('Gender'),
    //             Type: 'Student',
    //             StudentImage: url,
    //             StudentUid: user.uid
    //           });
    //          navigate('/student') 



    const [SelectImg, setSelectImg] = React.useState()
    const FileChange = (e) => {
        const File = e.target.files[0]
        setSelectImg(File)
        const file = File

    }






    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {

            const storageRef = ref(storage, `aniani`);

            uploadBytes(storageRef, SelectImg).then((snapshot) => {
                console.log("Done");
                getDownloadURL(storageRef)
                    .then((url) => {
                        console.log(url);


                        axios.post('http://localhost:3001/users/registers', {

                            email: data.get('email'),
                            password: data.get('password'),
                            firstName: data.get('firstName'),
                            lastName: data.get('lastName'),
                            course: personName,
                            address: data.get('address'),
                            gender: data.get('Gender'),
                            type: "student",
                            img: url
                        })
                            .then((res) => {
                                console.log(res.data);
                                const uid = res.data.User._id
                                console.log(uid);
                                localStorage.setItem("uid", uid);
                                navigate('/student')

                            }).catch((error) => {
                                console.log(error.data);

                            })
                    })
            }).catch((err) => {
                console.log(err);
            })




        } catch (error) {
            console.log(error);

        }
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Admission Form
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <FormControl sx={{ marginTop: 2, marginLeft: 2, width: 480 }}>
                                <InputLabel id="Course">Course</InputLabel>
                                <Select
                                    labelId="Course"
                                    id="Course"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Course" />}
                                    MenuProps={MenuProps}
                                >
                                    {namess.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            value={item}
                                            style={getStyles(item, personName, theme)}
                                        >
                                            {item}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="Gender"
                                    label="Gender"
                                    name="Gender"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label=" Address"
                                    name="address"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Grid item sx={{ marginTop: 2 }} xs={12}>
                            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file
                                <VisuallyHiddenInput onChange={FileChange} type="file" />
                            </Button>
                        </Grid>


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            REGISTER
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link onClick={() => { navigate('/') }} href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider >
    );
}