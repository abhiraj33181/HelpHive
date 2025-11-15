import { useEffect, useState } from "react";
import { createContext } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true;

export const ProviderContext = createContext();

const ProviderContextProvider = (props) => {

    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [pToken, setPToken] = useState(false)
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)



    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/provider/appointments`, { withCredentials: true })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.success(error.message)
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/provider/complete-appointment`, { appointmentId }, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.success(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/provider/cancel-appointment`, { appointmentId }, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.success(error.message)
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/provider/dashboard`, { withCredentials: true })
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.success(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/provider/profile`, { withCredentials: true })
            if (data.success) {
                setProfileData(data.profileData)
                setPToken(true)
                console.log(data.profileData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message)
            toast.success(error.message)
        }
    }

    useEffect(() => {
        getProfileData()
    }, [])



    const value = {
        pToken, setPToken, backendURL, getAppointments, appointments, setAppointments, completeAppointment, cancelAppointment, dashData, setDashData, getDashData, profileData, setProfileData, getProfileData
    }


    return (
        <ProviderContext.Provider value={value}>
            {props.children}
        </ProviderContext.Provider>
    )
}

export default ProviderContextProvider;