import { createContext, useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [providers, setProviders] = useState([])

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const getAllProviders = async () => {
        try {
            const {data} = await axios.get(`${backendURL}/api/admin/all-providers`, {headers : {aToken}})
            if(data.success){
                setProviders(data.providers)
                console.log(providers)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailablity = async (provId) => {
        try {
            const {data} = await axios.post(`${backendURL}/api/admin/change-availablity`, {provId}, {headers : {aToken}})
            if (data.success){
                toast.success(data.message)
                getAllProviders()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        aToken, setAToken, backendURL, providers, getAllProviders, changeAvailablity
    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider