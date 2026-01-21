import { createContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios';
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken') : '');
    const [doctors,setDoctors] = useState([])
    const [appointments,setAppointments] = useState([])
    const [DashboardData,setDashboardData] = useState([])
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async () =>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/all-doctors`,{},{headers: {aToken}})
            if(data.success){
                setDoctors(data.doctors); 
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const changeAvailablity = async (docId) =>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/change-availablity`,{docId},{headers: {aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error("Error changing availability:", error);
            toast.error(error.response?.data?.message || "Failed to change availability. Please try again.");
        }
    }

    const getAllAppointments = async () =>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/appointments`,{headers: {aToken}})
            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments);
                 
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancleAppointment = async (appointmentId) =>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/appointment-cancel`,{appointmentId},{headers: {aToken}})
            if(data.success){
                 toast.success(data.message)
                 getAllAppointments()
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashboardData = async () =>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/admin/dashboard`,{headers: {aToken}})
            if(data.success){
                setDashboardData(data.DashboardData);
                console.log(data.DashboardData); 
            } else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken,setAToken,
        backendUrl,doctors,getAllDoctors,changeAvailablity,
        appointments,setAppointments,getAllAppointments,
        cancleAppointment,
        DashboardData,getDashboardData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider;
