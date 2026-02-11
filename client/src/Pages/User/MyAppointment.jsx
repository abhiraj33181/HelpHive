import React, { useContext, useEffect, useState } from 'react';
import { 
    Calendar, 
    Clock, 
    MapPin, 
    RefreshCw, 
    CreditCard, 
    AlertCircle, 
    CheckCircle2, 
    XCircle,
    CalendarDays
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';

const MyAppointment = () => {
    const { backendURL, token, axios, getProvidersData, navigate } = useContext(AppContext);
    
    const [appointments, setAppointments] = useState([]);
    const [isAppointment, setIsAppointment] = useState(true); // true = Upcoming, false = Past
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // --- Helpers ---
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    // --- API Calls ---
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user/listAppointment`, { withCredentials: true });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        if(!window.confirm("Are you sure you want to cancel this appointment?")) return;
        
        try {
            const { data } = await axios.post(`${backendURL}/api/user/cancelAppointment`, { appointmentId }, { withCredentials: true });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getProvidersData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const refreshData = async () => {
        setRefreshing(true);
        await getUserAppointments();
        setRefreshing(false);
        toast.info("List updated");
    };

    // --- Razorpay Logic ---
    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Appointment Payment",
            description: "Service Fee",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(`${backendURL}/api/user/verify-razorpay`, { response }, { withCredentials: true });
                    if (data.success) {
                        getUserAppointments();
                        toast.success(data.message);
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/payment-razorpay`, { appointmentId }, { withCredentials: true });
            if (data.success) {
                initPay(data.order);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        } else {
            navigate('/auth/login');
        }
    }, [token]);

    // --- Filtering Logic ---
    const filteredAppointments = appointments.filter(item => {
        if (isAppointment) {
            // Upcoming: Not completed AND Not cancelled
            return !item.isCompleted && !item.cancelled;
        } else {
            // Past: Completed OR Cancelled
            return item.isCompleted || item.cancelled;
        }
    });

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-slate-900">My Appointments</h1>
                    <button 
                        onClick={refreshData}
                        className={`p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-blue-600 ${refreshing ? 'animate-spin text-blue-600' : ''}`}
                        title="Refresh List"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
                <Link 
                    to='/providers' 
                    className='bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-sm'
                >
                    <CalendarDays className="w-4 h-4" /> Book New
                </Link>
            </div>

            {/* Tabs */}
            <div className="bg-slate-100 p-1.5 rounded-xl flex items-center max-w-md mx-auto md:mx-0 mb-8">
                <button 
                    onClick={() => setIsAppointment(true)} 
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${isAppointment ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Clock className="w-4 h-4" /> Upcoming
                </button>
                <button 
                    onClick={() => setIsAppointment(false)} 
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${!isAppointment ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Calendar className="w-4 h-4" /> History
                </button>
            </div>

            {/* Grid Content */}
            {filteredAppointments.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed'>
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Calendar className='w-10 h-10 text-slate-300' />
                    </div>
                    <h3 className='text-lg font-semibold text-slate-900'>No appointments found</h3>
                    <p className='text-slate-500 text-sm mt-1'>
                        {isAppointment ? "You don't have any upcoming bookings." : "No past appointment history available."}
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filteredAppointments.map((item) => (
                        <div key={item._id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col">
                            
                            {/* Card Header: Provider Info */}
                            <div className="p-5 flex items-start gap-4 border-b border-slate-50">
                                <img
                                    src={item.provData.image}
                                    alt={item.provData.name}
                                    className="w-14 h-14 rounded-full object-cover border border-slate-100"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 truncate">{item.provData.name}</h3>
                                    <p className="text-sm text-slate-500 truncate">{item.provData.service}</p>
                                    
                                    {/* Status Badge (Top Right of Content) */}
                                    <div className="mt-2">
                                        {item.cancelled && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                                                <XCircle className="w-3 h-3" /> Cancelled
                                            </span>
                                        )}
                                        {item.isCompleted && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <CheckCircle2 className="w-3 h-3" /> Completed
                                            </span>
                                        )}
                                        {!item.cancelled && !item.isCompleted && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                <Clock className="w-3 h-3" /> Scheduled
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body: Details */}
                            <div className="p-5 flex-1 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                    <span>{slotDateFormat(item.slotDate)} <span className="text-slate-300 mx-1">|</span> {item.slotTime}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-slate-600">
                                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                    <span className="line-clamp-2">{item.provData.address.line1}, {item.provData.address.line2}</span>
                                </div>
                                
                                <div className="h-px bg-slate-100 my-2"></div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CreditCard className="w-4 h-4 text-slate-400" />
                                        <span className="font-semibold text-slate-900">₹{item.amount}</span>
                                    </div>
                                    {!item.cancelled && item.payment && !item.isCompleted && (
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">PAID</span>
                                    )}
                                    {!item.cancelled && !item.payment && !item.isCompleted && (
                                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> UNPAID
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Card Footer: Actions */}
                            {!item.cancelled && !item.isCompleted && (
                                <div className="p-4 pt-0 flex gap-3">
                                    {!item.payment && (
                                        <button
                                            onClick={() => appointmentRazorpay(item._id)}
                                            className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        className={`flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${item.payment ? 'w-full' : ''} border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointment;