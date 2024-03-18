import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from '../../Screens/Login/Login'
import Register from '../../Screens/Register/Register'
import Admin from '../../Screens/Admindashboard/Admin'
import ProtectedRoutes from "../Rounting/ProtectedRoutes";
import Student from '../../Screens/Studentdashboard/Student'

const Routing = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='' element={<Login/>}/>
        <Route path='Register' element={<Register/>}/>
        <Route path='Admin/*' element={<ProtectedRoutes component={<Admin />} />}/>
        <Route path='Student' element={<ProtectedRoutes component={<Student />} />}/>
    </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default Routing