import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();
axios.defaults.withCredentials = true;

const AppContextProvider = (props) => {

    const [providers, setProviders] = useState([]);
    const [userData, setUserData] = useState(null);

    const currencySymbol = "₹";
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();


    const [token, setToken] = useState(false);

    const getProvidersData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/provider/list`, {withCredentials : true});

            if (data.success) {
                setProviders(data.providers);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };


    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(
                `${backendURL}/api/user/getProfile` , {withCredentials : true}
            );

            if (data.success) {
                setUserData(data.userData);
                setToken(true);
            } else {
                setUserData(null);
                setToken(false);
            }
        } catch (error) {
            setUserData(null);
            setToken(false);
        }
    };

    const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return (
            dateArray[0] +
            " " +
            months[Number(dateArray[1])] +
            " " +
            dateArray[2]
        );
    };

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    };

    const value = {
        providers,
        currencySymbol,
        backendURL,
        axios,
        navigate,
        userData,
        setUserData,
        loadUserProfileData,
        getProvidersData,
        calculateAge,
        slotDateFormat,
        token,
        setToken
    };

    useEffect(() => {
        getProvidersData();
    }, []);

    useEffect(() => {
        loadUserProfileData();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
