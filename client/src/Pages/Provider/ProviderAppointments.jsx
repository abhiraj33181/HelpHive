import React, { useContext, useEffect, useState } from 'react';
import { 
    Calendar, 
    Clock, 
    MapPin, 
    RefreshCw, 
    User, 
    CheckCircle2, 
    XCircle, 
    AlertCircle,
    CalendarDays,
    Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import { ProviderContext } from '../../context/ProviderContext';

const MyAppointment = () => {
    const { pToken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(ProviderContext);
    const { slotDateFormat, currencySymbol } = useContext(AppContext);

    const [isUpcoming, setIsUpcoming] = useState(true); // true = Upcoming, false = Past
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Initial Fetch
    useEffect(() => {
        if (pToken) {
            fetchData();
        }
    }, [pToken]);

    const fetchData = async () => {
        try {
            await getAppointments();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await getAppointments();
            toast.success('List updated successfully');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleCancel = (id) => {
        if (window.confirm("Are you sure you want to reject this appointment?")) {
            cancelAppointment(id);
        }
    };

    const handleComplete = (id) => {
        if (window.confirm("Mark this job as completed?")) {
            completeAppointment(id);
        }
    };

    // Filter Logic
    const filteredAppointments = appointments.filter(item => {
        if (isUpcoming) {
            return !item.isCompleted && !item.cancelled;
        } else {
            return item.isCompleted || item.cancelled;
        }
    });

    if (isLoading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Appointment Requests</h1>
                        <p className="text-slate-500 mt-1">Manage your schedule and bookings</p>
                    </div>
                    <button 
                        onClick={handleRefresh}
                        className={`p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-all ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
                        title="Refresh"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Note: Usually providers don't book appointments here, but keeping link as per original code */}
                <Link to='/providers' className='hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm'>
                    <CalendarDays className="w-4 h-4" /> Book New
                </Link>
            </div>

            {/* --- Tabs --- */}
            <div className="bg-slate-100 p-1.5 rounded-xl flex items-center max-w-md mx-auto md:mx-0 mb-8">
                <button 
                    onClick={() => setIsUpcoming(true)} 
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${isUpcoming ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <Clock className="w-4 h-4" /> Upcoming
                </button>
                <button 
                    onClick={() => setIsUpcoming(false)} 
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${!isUpcoming ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <CheckCircle2 className="w-4 h-4" /> History
                </button>
            </div>

            {/* --- Content Grid --- */}
            {filteredAppointments.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed'>
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Calendar className='w-10 h-10 text-slate-300' />
                    </div>
                    <h3 className='text-lg font-semibold text-slate-900'>No appointments found</h3>
                    <p className='text-slate-500 text-sm mt-1'>
                        {isUpcoming ? "You don't have any scheduled jobs." : "No past appointment history."}
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filteredAppointments.map((item, index) => (
                        <div key={index} className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col">
                            
                            {/* Card Header: User Info */}
                            <div className="p-5 flex items-start gap-4 border-b border-slate-50">
                                <img
                                    src={item.userData.image}
                                    alt={item.userData.name}
                                    className="w-14 h-14 rounded-full object-cover border border-slate-100 bg-slate-50"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 truncate">{item.userData.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                                        <Briefcase className="w-3.5 h-3.5" />
                                        <span className="truncate">{item.provData.service}</span>
                                    </div>
                                    
                                    {/* Status Badge for Past Items */}
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
                                    </div>
                                </div>
                            </div>

                            {/* Card Body: Details */}
                            <div className="p-5 flex-1 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <span>{slotDateFormat(item.slotDate)} <span className="text-slate-300 mx-1">|</span> {item.slotTime}</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 mt-[-2px]">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="line-clamp-2 leading-relaxed">
                                        {item.userData.address.street}, {item.userData.address.city}
                                    </span>
                                </div>
                                
                                <div className="h-px bg-slate-100 my-2"></div>
                                
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">Service Fee</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">{currencySymbol}{item.amount}</span>
                                        {item.payment ? (
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded uppercase">Paid</span>
                                        ) : (
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-700 rounded uppercase">Unpaid</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer: Actions (Only for Upcoming) */}
                            {isUpcoming && (
                                <div className="p-4 pt-0 flex gap-3">
                                    <button
                                        onClick={() => handleCancel(item._id)}
                                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleComplete(item._id)}
                                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                                    >
                                        Complete
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