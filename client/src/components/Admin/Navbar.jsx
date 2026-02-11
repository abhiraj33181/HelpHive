import { HandHelpingIcon } from 'lucide-react'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AdminContext } from '../../context/AdminContext'
import { ProviderContext } from '../../context/ProviderContext'
import { toast } from 'react-toastify'
import axios from 'axios'

function Navbar() {
    const { backendURL, getProfileData } = useContext(ProviderContext)
    const {getProfile} = useContext(AdminContext)

    const navigate = useNavigate()
    const logOut = async () => {
        try {
            if (aToken) {
                const { data } = await axios.get(`${backendURL}/api/admin/logout`, { withCredentials: true })
                if (data.success) {
                    toast.success(data.message)
                    await getProfile()
                    navigate('/')
                }
            }else{
                const { data } = await axios.get(`${backendURL}/api/provider/logout`, {withCredentials : true})
            if (data.success) {
                toast.success(data.message)
                await getProfileData()
                navigate('/')
            }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const { aToken, setAToken } = useContext(AdminContext)
    const { pToken, setPToken } = useContext(ProviderContext)
    return (
        <nav className="flex justify-between items-center px-5 sm:px-12 py-3 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-30">
            <div className="flex items-center gap-3 text-sm sm:text-base">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                        <HandHelpingIcon className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-800 select-none">
                        HelpHive
                    </h1>
                </Link>
                <span className="text-xs border border-gray-400 text-gray-700 rounded-full px-3 py-1 select-none">
                    {aToken ? 'Admin' : 'Provider'}
                </span>
            </div>

            <button
                onClick={logOut}
                className="bg-[#5F6FFF] hover:bg-[#4d59ce] text-white font-semibold text-sm px-8 py-2 rounded-full shadow-md transition"
                aria-label="Logout"
            >
                Logout
            </button>
        </nav>
    )
}

export default Navbar