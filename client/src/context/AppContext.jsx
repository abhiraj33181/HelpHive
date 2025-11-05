import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [providers, setProviders] = useState([])
    const currencySymbol = '₹'
    const backendURL = import.meta.env.VITE_BACKEND_URL
    
    const value = {
        providers,
        currencySymbol
    }

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

    useEffect(() => {
        getProvidersData()
    }, [])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider