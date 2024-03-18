import React from 'react'
import PersistentDrawerRight from '../../components/Drawer'
import { Box, Button } from '@mui/material'
import { Routes , Route } from 'react-router-dom'
import Allcourse from '../Admindashboard/Allcourse/Allcourse'
import Addcourse from '../Admindashboard/Addcourse/Addcourse'
import Allstudent from '../Admindashboard/Allstudent/Allstudent'
import Singlecourse from '../Admindashboard/Singlecourse/Singlecourse'
import Singlestudent from '../Admindashboard/Singlestudent/Singlestudent'

const Admin = () => {
  return (
    <>
    <PersistentDrawerRight screen={
      <Box>
        <Routes>
          <Route path='/' element={<Addcourse/>} />
          <Route path='/allcourse' element={<Allcourse/>} />
          <Route path='/allstudent' element={<Allstudent/>} />
          <Route path='/singlecourse/:id' element={<Singlecourse/>} />
          <Route path='/singlestudent/:id' element={<Singlestudent/>} />
        </Routes>

      </Box>
    }/>
    </>

  )
}

export default Admin