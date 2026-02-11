import React, { useContext, useEffect, useState } from 'react';
import { ProviderContext } from '../../context/ProviderContext';
import { AppContext } from '../../context/AppContext';
import Modal from '../../components/Modal';
import {
    Calendar,
    Clock,
    CheckCircle2,
    TrendingUp,
    DollarSign,
    User,
    MapPin,
    Phone,
    MessageCircleMore,
    Star,
    ChevronRight,
    MoreVertical,
    CalendarDays,
    Briefcase
} from 'lucide-react';

const ProviderDashboard = () => {
    const { 
        navigate, 
        pToken, 
        dashData, 
        getDashData, 
        completeAppointment, 
        profileData, 
        updateAppointmentStatus 
    } = useContext(ProviderContext);

    const { slotDateFormat } = useContext(AppContext);

    // Modal States
    const [open, setOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isCompleting, setIsCompleting] = useState(false);

    // Completion Form States
    const [completeStatus, setCompleteStatus] = useState('complete');
    const [remark, setRemark] = useState('');
    const [extraCharge, setExtraCharge] = useState('');
    const [extraChargeReason, setExtraChargeReason] = useState('');

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        if (hour < 20) return "Good Evening";
        return "Good Night";
    };

    useEffect(() => {
        if (pToken) getDashData();
    }, [pToken]);

    const handleCloseModal = () => {
        setOpen(false);
        setTimeout(() => {
            setSelectedAppointment(null);
            setIsCompleting(false);
            setRemark('');
            setExtraCharge('');
            setExtraChargeReason('');
        }, 300);
    };

    if (!profileData) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className='min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8'>
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* --- Header Section --- */}
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
                    <div className='flex items-center gap-5'>
                        <img 
                            src={profileData.image} 
                            alt="Profile" 
                            className='h-16 w-16 md:h-20 md:w-20 object-cover rounded-full border-4 border-slate-100 shadow-sm' 
                        />
                        <div>
                            <h1 className='text-2xl md:text-3xl font-bold text-slate-900'>
                                {getGreeting()}, <span className="text-blue-600">{profileData.name.split(' ')[0]}</span>!
                            </h1>
                            <div className='flex flex-wrap items-center gap-4 mt-1 text-sm text-slate-500'>
                                <span className='flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium'>
                                    <Briefcase className="w-3.5 h-3.5" /> {profileData.service}
                                </span>
                                <span className='flex items-center gap-1'>
                                    <MapPin className="w-3.5 h-3.5" /> {profileData.address.city}
                                </span>
                                <span className='flex items-center gap-1 text-amber-600 font-medium'>
                                    <Star className="w-3.5 h-3.5 fill-current" /> 4.8
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <button className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2'>
                        <CalendarDays className='w-4 h-4' /> Update Availability
                    </button>
                </div>

                {/* --- Stats Grid --- */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <StatCard 
                        title="Today’s Appointments" 
                        value={dashData?.appointments || 0} 
                        trend="+12%" 
                        icon={Calendar} 
                        color="bg-blue-50 text-blue-600" 
                    />
                    <StatCard 
                        title="Pending Requests" 
                        value="2" 
                        trend="+5%" 
                        icon={Clock} 
                        color="bg-amber-50 text-amber-600" 
                    />
                    <StatCard 
                        title="Completed Jobs" 
                        value="7" 
                        trend="+8%" 
                        icon={CheckCircle2} 
                        color="bg-purple-50 text-purple-600" 
                    />
                    <StatCard 
                        title="Total Earnings" 
                        value={`₹${(dashData?.earning || 0).toLocaleString()}`} 
                        trend="+15%" 
                        icon={DollarSign} 
                        color="bg-emerald-50 text-emerald-600" 
                    />
                </div>

                {/* --- Main Content Grid --- */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    
                    {/* Left Column: Schedule (Span 2) */}
                    <div className='lg:col-span-2 space-y-6'>
                        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6 min-h-[500px]'>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                                    <Calendar className="w-5 h-5 text-blue-600" /> Today's Schedule
                                </h2>
                                <button className='text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors'>
                                    View All <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className='space-y-4'>
                                {dashData?.latestAppointments?.filter(a => !a.cancelled && !a.isCompleted).length > 0 ? (
                                    dashData.latestAppointments
                                        .filter(a => !a.cancelled && !a.isCompleted)
                                        .map((item, index) => (
                                            <div 
                                                key={index}
                                                onClick={() => { setSelectedAppointment(item); setOpen(true); }}
                                                className='group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md bg-white transition-all cursor-pointer'
                                            >
                                                <img 
                                                    src={item.userData.image} 
                                                    alt={item.userData.name} 
                                                    className='w-14 h-14 rounded-full object-cover bg-slate-100' 
                                                />
                                                <div className='flex-1 min-w-0'>
                                                    <div className='flex justify-between items-start'>
                                                        <h3 className='font-semibold text-slate-900 truncate'>{item.userData.name}</h3>
                                                        <span className='text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md'>
                                                            {item.slotTime}
                                                        </span>
                                                    </div>
                                                    <p className='text-sm text-slate-500 truncate'>{item.provData.service}</p>
                                                    <p className='text-xs text-slate-400 mt-1 truncate'>
                                                        {item.userData.address?.street}, {item.userData.address?.city}
                                                    </p>
                                                </div>
                                                <div className='hidden sm:flex flex-col items-end gap-1'>
                                                    <span className='font-bold text-slate-900'>₹{item.amount}</span>
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${item.payment ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {item.payment ? 'PAID' : 'UNPAID'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className='flex flex-col items-center justify-center h-64 text-center'>
                                        <div className='w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3'>
                                            <Calendar className='w-8 h-8 text-slate-300' />
                                        </div>
                                        <h3 className='text-slate-900 font-medium'>No Appointments Today</h3>
                                        <p className='text-slate-500 text-sm'>Enjoy your free time!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quick Stats & Upcoming (Span 1) */}
                    <div className='space-y-6'>
                        
                        {/* Performance Card */}
                        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6'>
                            <h3 className='font-bold text-slate-900 mb-6 flex items-center gap-2'>
                                <TrendingUp className="w-5 h-5 text-emerald-600" /> Performance
                            </h3>
                            <div className='space-y-5'>
                                <div className='flex justify-between items-center pb-4 border-b border-slate-50'>
                                    <span className='text-slate-600 text-sm'>Satisfaction</span>
                                    <span className='font-bold text-slate-900 flex items-center gap-1'>
                                        <Star className="w-4 h-4 text-amber-500 fill-current" /> 4.8/5
                                    </span>
                                </div>
                                <div className='flex justify-between items-center pb-4 border-b border-slate-50'>
                                    <span className='text-slate-600 text-sm'>Completion Rate</span>
                                    <span className='font-bold text-emerald-600'>98%</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='text-slate-600 text-sm'>Response Time</span>
                                    <span className='font-bold text-blue-600'>~2 min</span>
                                </div>
                            </div>
                            <button className='w-full mt-6 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl py-2.5 hover:bg-slate-50 transition-colors'>
                                View Analytics
                            </button>
                        </div>

                        {/* Upcoming Summary */}
                        <div className='bg-white rounded-2xl shadow-sm border border-slate-200 p-6'>
                            <h3 className='font-bold text-slate-900 mb-4 flex items-center gap-2'>
                                <Clock className="w-5 h-5 text-indigo-600" /> Upcoming
                            </h3>
                            {/* Placeholder for upcoming logic */}
                            <div className='text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                                <p className='text-sm text-slate-500'>No upcoming appointments scheduled.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* --- Appointment Modal --- */}
            <Modal isOpen={open} onClose={handleCloseModal}>
                {selectedAppointment && (
                    !isCompleting ? (
                        // --- DETAILS VIEW ---
                        <div className="p-1">
                            <div className="flex flex-col sm:flex-row gap-6 mb-6">
                                <img 
                                    src={selectedAppointment.userData.image} 
                                    className="w-24 h-24 rounded-2xl object-cover bg-slate-100 shadow-sm mx-auto sm:mx-0" 
                                />
                                <div className="text-center sm:text-left flex-1">
                                    <h2 className="text-2xl font-bold text-slate-900">{selectedAppointment.userData.name}</h2>
                                    <p className="text-slate-500 text-sm mt-1 flex items-center justify-center sm:justify-start gap-1">
                                        <MapPin className="w-4 h-4" /> 
                                        {selectedAppointment.userData.address.city}, {selectedAppointment.userData.address.state}
                                    </p>
                                    
                                    <div className="flex justify-center sm:justify-start gap-3 mt-4">
                                        <ActionButton icon={Phone} color="blue" onClick={() => window.location.href = `tel:${selectedAppointment.userData.phone}`} />
                                        <ActionButton icon={MessageCircleMore} color="green" onClick={() => navigate(`/provider/dashboard/chat/${selectedAppointment.userData._id}`)} />
                                        <ActionButton icon={MapPin} color="amber" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Service</p>
                                    <p className="font-semibold text-slate-900">{selectedAppointment.provData.service}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-xs text-slate-500 uppercase font-bold">Amount</p>
                                    <p className="font-semibold text-slate-900">₹{selectedAppointment.amount}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {selectedAppointment.isAccepted === 'Pending' ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        <button 
                                            onClick={() => { updateAppointmentStatus(selectedAppointment._id, 'Appointment Confirmed'); handleCloseModal(); }}
                                            className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                                        >
                                            Accept Request
                                        </button>
                                        <button 
                                            onClick={() => { updateAppointmentStatus(selectedAppointment._id, 'Appointment Request Cancelled'); handleCloseModal(); }}
                                            className="py-2.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => setIsCompleting(true)}
                                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                                    >
                                        Mark Job Complete
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        // --- COMPLETION FORM ---
                        <div className="space-y-5">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                <h3 className="text-lg font-bold text-slate-900">Complete Job</h3>
                                <button onClick={() => setIsCompleting(false)} className="text-sm text-slate-500 hover:text-slate-900">Back</button>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700">Remarks</label>
                                <textarea 
                                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                                    rows="3"
                                    placeholder="Describe the work done..."
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Extra Cost</label>
                                    <input 
                                        type="number" 
                                        className="w-full p-2.5 rounded-xl border border-slate-300 outline-none focus:border-blue-500 text-sm"
                                        placeholder="₹0"
                                        value={extraCharge}
                                        onChange={(e) => setExtraCharge(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Reason</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-2.5 rounded-xl border border-slate-300 outline-none focus:border-blue-500 text-sm"
                                        placeholder="Parts, labor..."
                                        value={extraChargeReason}
                                        onChange={(e) => setExtraChargeReason(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={() => {
                                    completeAppointment(selectedAppointment._id, completeStatus, remark, extraCharge, extraChargeReason);
                                    handleCloseModal();
                                }}
                                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-green-600/20"
                            >
                                Submit Completion
                            </button>
                        </div>
                    )
                )}
            </Modal>
        </div>
    );
}

// --- Helper Components ---

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
    <div className='bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-start justify-between'>
        <div>
            <p className='text-slate-500 text-sm font-medium'>{title}</p>
            <h3 className='text-2xl font-bold text-slate-900 mt-1 mb-1'>{value}</h3>
            <span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1 w-fit'>
                <TrendingUp className="w-3 h-3" /> {trend}
            </span>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6" />
        </div>
    </div>
);

const ActionButton = ({ icon: Icon, color, onClick }) => {
    const colorMap = {
        blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
        green: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
        amber: 'bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200',
    };
    
    return (
        <button 
            onClick={onClick}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-colors ${colorMap[color]}`}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
};

export default ProviderDashboard;