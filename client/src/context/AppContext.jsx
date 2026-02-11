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
            const { data } = await axios.get(`${backendURL}/api/provider/list`, { withCredentials: true });

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
                `${backendURL}/api/user/getProfile`, { withCredentials: true }
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

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

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

    // review stuff 
    // ⭐ REVIEW APIs integrated
    const addReview = async (appointmentId, rating, title, message) => {
        try {
            const { data } = await axios.post(
                `${backendURL}/api/reviews/add`,
                { appointmentId, rating, title, message },
                { withCredentials: true }
            );
            return data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to add review");
        }
    };

    const getProviderReviews = async (providerId) => {
        try {
            const { data } = await axios.get(
                `${backendURL}/api/reviews/provider/${providerId}`
            );
            return data.reviews;
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            const { data } = await axios.delete(
                `${backendURL}/api/reviews/delete/${reviewId}`,
                { withCredentials: true }
            );
            return data;
        } catch (error) {
            console.log(error);
            toast.error("Review delete failed");
        }
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
        setToken,
        addReview,
        getProviderReviews,
        deleteReview,
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
