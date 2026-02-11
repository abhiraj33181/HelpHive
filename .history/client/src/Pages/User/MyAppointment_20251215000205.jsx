import { Bell, Calendar, CalendarDays, ChevronDown, Clock, ContactRound, FileText, HandHelpingIcon, MapPin, RefreshCw } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../../context/AppContext'

const MyAppointment = () => {

    const [refresh, setRefresh] = useState(false)

    const [isAppointment, setIsAppointment] = useState(true)
    const { backendURL, token, axios, getProvidersData, navigate } = useContext(AppContext)

    const [appointments, setAppointments] = useState([])
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user/listAppointment`, { withCredentials: true })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            toast(error.message)
            console.log(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/cancelAppointment`, { appointmentId }, { withCredentials: true })
            if (data.success) {
                toast.success(data.message)
                await getUserAppointments()
                await getProvidersData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast(error.message)
            console.log(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Appointment Payment",
            description: "Apppointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)

                try {
                    const { data } = await axios.post(`${backendURL}/api/user/verify-razorpay`, { response }, { withCredentials: true })
                    if (data.success) {
                        getUserAppointments()
                        navigate('/dashboard')
                        toast.success(data.message)
                    } else {
                        console.log(data.message)
                        toast.error(data.message)
                    }
                } catch (error) {

                }
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/payment-razorpay`, { appointmentId }, { withCredentials: true })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast(error.message)
            console.log(error.message)
        }
    }

    const refreshAppointment = async () => {
        try {
            setRefresh(true)
            await getUserAppointments()
            toast.success('Appointment Updated!')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setRefresh(false)
        }
    }

    const upcomingAppointments = appointments.filter(
        item => !item.isCompleted && !item.cancelled
    );


    useEffect(() => {
        if (token) {
            getUserAppointments()
        } else {
            navigate('/auth/login')
        }
    }, [token])


    return (
        <div>
            <div className='mx-4 my-10 sm:mx-[10%] flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between'>
                <div className='flex gap-5 items-center'>
                    <div>
                        <h1 className='text-center text-3xl font-semibold'>My Appointments</h1>
                        <p className='text-center text-md md:text-xl text-zinc-600'>Manage your appointment</p>
                    </div>
                    <div className='h-full hover:text-blue-600 cursor-pointer'>
                        <RefreshCw className={`${refresh ? 'loader' : ''}`} onClick={refreshAppointment} />
                    </div>
                </div>
                <Link to='/providers' className='text-sm bg-[#2D2E2E] py-2 px-5 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-[#0f0f0f]'><CalendarDays /> Book New Appointment</Link>
            </div>

            <div className='mx-4 mt-5 sm:mx-[10%] flex items-center justify-center gap-5 bg-zinc-200 rounded-xl overflow-hidden p-1'>
                <button onClick={() => setIsAppointment(prev => !prev)} className={`${isAppointment ? 'bg-white' : ''} cursor-pointer flex flex-1 items-center justify-center gap-3 p-2 rounded-xl`}>Upcoming <Clock /></button>
                <button onClick={() => setIsAppointment(prev => !prev)} className={`${!isAppointment ? 'bg-white' : ''} cursor-pointer flex flex-1 items-center justify-center gap-3 p-2 rounded-xl`}>Past <Calendar /></button>
            </div>

            {
                isAppointment ? (
                    <>
                        {!upcomingAppointments.length ? (
                            <div className='flex flex-col h-100 justify-center items-center mx-4 mt-5 sm:mx-[10%] bg-white rounded-xl'>
                                <Clock className='w-25 h-25 text-zinc-400 mb-5' />
                                <h1 className='text-xl md:text-3xl font-semibold text-zinc-500'>No Upcoming Appointments</h1>
                                <p className='text-md md:text-md text-zinc-500'>You have no upcooming appointment scheduled!</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 mt-5 sm:mx-[10%]'>
                                {appointments.filter(item => !item.isCompleted && !item.cancelled).map((item, index) => (
                                    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-4 hover:shadow-md transition relative">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.provData.image}
                                                className="w-20 h-20 rounded-full object-cover"
                                            />

                                            <div className='flex flex-col gap-2'>
                                                <p className="font-semibold text-xl">{item.provData.name}</p>
                                                <p className="text-sm text-zinc-500 flex gap-2 items-center"><ContactRound className='h-5 w-5' />{item.provData.service}</p>
                                                <p className="text-sm text-zinc-600 flex gap-2 items-center">
                                                    <MapPin className='h-5 w-5' />{item.provData.address.line1}, {item.provData.address.line2}
                                                </p>
                                                <p className="text-sm text-zinc-600 flex gap-2 items-center">
                                                    <Calendar className='h-5 w-5' /> {slotDateFormat(item.slotDate)} | {item.slotTime}
                                                </p>
                                                <div className="text-sm text-zinc-700 flex flex-col md:flex-row gap-1 md:gap-10">
                                                    <p>Fee : <span className='font-semibold'>₹{item.amount}</span></p>
                                                    <p className='font-semibold'><span className='text-red-600 mr-1'>*</span>Wire brunt out!</p>
                                                </div>
                                            </div>
                                        </div>

                                        {!item.cancelled && !item.isCompleted && (
                                            <div className="flex gap-3 mt-4">

                                                {!item.payment && (
                                                    <button
                                                        className="flex-1 px-4 py-2 rounded-lg border border-blue-500 text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white font-medium transition"
                                                        onClick={() => appointmentRazorpay(item._id)}
                                                    >
                                                        Pay Online
                                                    </button>
                                                )}

                                                <button
                                                    className="flex-1 px-4 py-2 rounded-lg border border-red-600 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white font-medium transition"
                                                    onClick={() => cancelAppointment(item._id)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}

                                        <div className='flex flex-col gap-2 absolute right-3 top-2'>

                                            {!item.cancelled && !item.isCompleted && (
                                                <span className="text-center px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full border border-green-200">
                                                    Upcoming
                                                </span>
                                            )}

                                            {!item.cancelled && item.payment && !item.isCompleted && (
                                                <span className="text-center px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                                                    Paid
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                ))}
                            </div>
                        )}

                    </>
                ) : (
                    <>
                        {!appointments.length ? (
                            <div className='flex flex-col h-100 justify-center items-center mx-4 mt-5 sm:mx-[10%] bg-white rounded-xl'>
                                <FileText className='w-25 h-25 text-zinc-400 mb-5' />
                                <h1 className='text-xl md:text-3xl font-semibold text-zinc-500'>No Past Appointments</h1>
                                <p className='text-sm md:text-md text-zinc-500'>Your completed appointments will appear here.</p>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 mt-5 sm:mx-[10%]'>
                                {appointments.filter(item => item.isCompleted || item.cancelled).map((item, index) => (
                                    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-4 hover:shadow-md transition">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.provData.image}
                                                className="w-20 h-20 rounded-full object-cover"
                                            />

                                            <div className='flex flex-col gap-2'>
                                                <p className="font-semibold text-xl">{item.provData.name}</p>
                                                <p className="text-sm text-zinc-500 flex gap-2 items-center"><ContactRound className='h-5 w-5' />{item.provData.service}</p>
                                                <p className="text-sm text-zinc-600 flex gap-2 items-center">
                                                    <MapPin className='h-5 w-5' />{item.provData.address.line1}, {item.provData.address.line2}
                                                </p>
                                                <p className="text-sm text-zinc-600 flex gap-2 items-center">
                                                    <Calendar className='h-5 w-5' /> {slotDateFormat(item.slotDate)} | {item.slotTime}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-2">
                                            <div className="text-sm text-zinc-700">
                                                <p>Fee : ₹{item.amount}</p>
                                                <p>Wire brunt out!</p>
                                            </div>

                                            <div>
                                                {!item.cancelled && item.payment && !item.isCompleted && (
                                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                                                        Paid
                                                    </span>
                                                )}

                                                {item.cancelled && !item.isCompleted && (
                                                    <span className="px-3 py-1 bg-red-50 text-red-500 text-xs rounded-full border border-red-200">
                                                        Cancelled
                                                    </span>
                                                )}

                                                {item.isCompleted && (
                                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                                                        Completed
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        )}
                    </>
                )
            }


        </div>
    )
}

export default MyAppointment