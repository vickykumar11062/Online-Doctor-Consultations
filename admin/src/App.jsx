import React, { useContext, useEffect, useState } from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllAppointments from './pages/Admin/AllAppointments.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorAppointments from './pages/Doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';

const App = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  const [isDarkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return aToken || dToken ? (
    <div className='bg-gray-50 dark:bg-gray-950 dark:text-white'>
      <ToastContainer />
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* admin route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard />}/>
          <Route path='/all-appointments' element={<AllAppointments />}/>
          <Route path='/add-doctor' element={<AddDoctor />}/>
          <Route path='/doctor-list' element={<DoctorsList />}/>

          {/* doctor route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />}/>
          <Route path='/doctor-appointments' element={<DoctorAppointments />}/>
          <Route path='/doctor-profile' element={<DoctorProfile />}/>

        </Routes>
      </div>
    </div>
  ) : (
    <>
     <Login />
     <ToastContainer />
    </> 
  )
}

export default App