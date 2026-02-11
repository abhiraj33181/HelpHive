import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedProvider from '../components/RelatedProviders';
import { toast } from 'react-toastify';
import { Calendar, Clock, CheckCircle2, Info, MapPin, ShieldCheck, Star } from 'lucide-react';

const Appointment = () => {
    const { provId } = useParams();
    const navigate = useNavigate();
    const { providers, currencySymbol, backendURL, token, getProvidersData, axios } = useContext(AppContext);

    const [provInfo, setProvInfo] = useState(null);
    const [providerSlots, setProviderSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const fetchProvInfo = () => {
        const info = providers.find((prov) => prov._id === provId);
        setProvInfo(info);
    };

    const getAvailableSlots = () => {
        setProviderSlots([]);
        const today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0); // 9:00 PM End Time

            if (i === 0) {
                let now = new Date();
                let minutes = now.getMinutes();
                let nextHour = now.getHours();
                
                // If past 30 mins, move to next hour, else next half hour
                if(minutes > 30) nextHour++; 
                let nextMinutes = minutes > 30 ? 0 : 30;

                currentDate.setHours(nextHour);
                currentDate.setMinutes(nextMinutes);
            } else {
                currentDate.setHours(10, 0, 0, 0); // 10:00 AM Start Time
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                // Date format for API check: D_M_YYYY
                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();
                const slotDateKey = `${day}_${month}_${year}`;
                
                const isBooked = provInfo?.slots_booked?.[slotDateKey]?.includes(formattedTime);

                if (!isBooked) {
                    timeSlots.push({
                        dateTime: new Date(currentDate),
                        time: formattedTime,
                    });
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            setProviderSlots((prev) => [...prev, timeSlots]);
        }
    };

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Please login to book an appointment');
            return navigate('/auth/login');
        }
        if (!slotTime) {
            toast.error('Please select a time slot');
            return;
        }

        try {
            const dateObj = providerSlots[slotIndex][0].dateTime;
            const slotDate = `${dateObj.getDate()}_${dateObj.getMonth() + 1}_${dateObj.getFullYear()}`;

            const { data } = await axios.post(
                `${backendURL}/api/user/bookAppointment`,
                { provId, slotDate, slotTime },
                { withCredentials: true }
            );

            if (data.success) {
                toast.success(data.message);
                getProvidersData();
                navigate('/dashboard/my-appointments');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (providers.length > 0) fetchProvInfo();
    }, [providers, provId]);

    useEffect(() => {
        if (provInfo) getAvailableSlots();
    }, [provInfo]);

    if (!provInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-6xl mx-auto">
                
                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Provider Details */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-6 items-start">
                            <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
                                <img src={provInfo.image} alt={provInfo.name} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex-1 space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                            {provInfo.name} 
                                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                                        </h1>
                                        <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                                            <span className="font-medium text-slate-700">{provInfo.service}</span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span>{provInfo.experience} Experience</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="font-bold text-amber-700 text-sm">4.8</span>
                                        <span className="text-xs text-amber-600">(120 reviews)</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-2">
                                     <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        {provInfo.address?.city || 'Local Area'}, {provInfo.address?.line1 || 'Main St'}
                                     </div>
                                </div>
                                
                                <div className="pt-4 mt-2 border-t border-slate-100">
                                    <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                        <Info className="w-4 h-4 text-slate-400" /> About
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {provInfo.about}
                                    </p>
                                </div>
                            </div>
                        </div>

                         {/* Booking Section */}
                         <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-blue-600" /> Book Appointment
                            </h3>

                            {/* Date Selection */}
                            <div className="mb-6">
                                <p className="text-sm font-medium text-slate-500 mb-3">Select Date</p>
                                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                    {providerSlots.length > 0 && providerSlots.map((daySlots, index) => {
                                        if(!daySlots[0]) return null;
                                        const date = daySlots[0].dateTime;
                                        const isSelected = slotIndex === index;
                                        
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => { setSlotIndex(index); setSlotTime(''); }}
                                                className={`flex-shrink-0 min-w-[70px] flex flex-col items-center justify-center py-3 rounded-xl border transition-all duration-200 ${
                                                    isSelected 
                                                    ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105' 
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className="text-xs font-medium uppercase">{daysOfWeek[date.getDay()]}</span>
                                                <span className="text-lg font-bold mt-1">{date.getDate()}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div className="mb-8">
                                <p className="text-sm font-medium text-slate-500 mb-3">Select Time</p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {providerSlots.length > 0 && providerSlots[slotIndex]?.map((slot, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSlotTime(slot.time)}
                                            className={`py-2 px-1 text-sm rounded-lg border text-center transition-all ${
                                                slot.time === slotTime 
                                                ? 'bg-blue-600 text-white border-blue-600 font-medium shadow-sm' 
                                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                        >
                                            {slot.time.toLowerCase()}
                                        </button>
                                    ))}
                                    {providerSlots[slotIndex]?.length === 0 && (
                                        <p className="col-span-full text-sm text-slate-400 italic">No slots available for this date.</p>
                                    )}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={bookAppointment}
                                disabled={!slotTime}
                                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                            >
                                Confirm Booking <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-4">
                                No payment required now. Pay after service completion.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Summary</h3>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-slate-600 text-sm">
                                    <span>Consultation Fee</span>
                                    <span>{currencySymbol}{provInfo.fees}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 text-sm">
                                    <span>Booking Fee</span>
                                    <span>{currencySymbol}0</span>
                                </div>
                                <div className="h-px bg-slate-100 my-2"></div>
                                <div className="flex justify-between text-slate-900 font-bold text-base">
                                    <span>Total Amount</span>
                                    <span>{currencySymbol}{provInfo.fees}</span>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    Cancellation is free up to 2 hours before the appointment. Late cancellations may incur a small fee.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- Related Providers --- */}
                <div className="mt-16">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Similar Professionals</h2>
                    <RelatedProvider provId={provId} service={provInfo.service} />
                </div>

            </div>
        </div>
    );
};

export default Appointment;