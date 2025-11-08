import { createContext, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [providers, setProviders] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const getAllProviders = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/admin/all-providers`, { headers: { aToken } })
            if (data.success) {
                setProviders(data.providers)
                console.log(providers)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailablity = async (provId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/admin/change-availablity`, { provId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllProviders()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/admin/appointments`, { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(`${backendURL}/api/admin/appointment-cancel`, {appointmentId}, {headers : {aToken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const {data} = await axios.get(`${backendURL}/api/admin/dashboard`, {headers : {aToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }


    const value = {
        aToken, setAToken, backendURL, providers, getAllProviders, changeAvailablity, appointments, setAppointments, getAllAppointments, slotDateFormat, cancelAppointment, getDashData, dashData, setDashData
    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider