import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [providers, setProviders] = useState([])
    const [userData, setUserData] = useState([])
    const currencySymbol = '₹'
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    
    
    const getProvidersData = async () => {
        try {
            const {data} = await axios.get(`${backendURL}/api/provider/list`)
            if(data.success) {
                setProviders(data.providers)
            }else{
                toast.error(data.messsage)
            }
        } catch (error) {
            toast.error(error.messsage)
            console.log(error)
        }
    }

    const loadUserProfileData = async () => {
        try {
            const {data} = await axios.get(`${backendURL}/api/user/getProfile`, {headers : {token}})
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.messsage)
            console.log(error)
        }
    }

    const calculateAge = (dob) => {
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()

        return age
    }

    const value = {
        providers,
        currencySymbol,
        token,
        setToken,
        backendURL,
        axios,
        navigate,
        userData,
        setUserData,
        loadUserProfileData,
        getProvidersData,
        calculateAge,
    }

    useEffect(() => {
        getProvidersData()
    }, [])

    useEffect(() => {
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider