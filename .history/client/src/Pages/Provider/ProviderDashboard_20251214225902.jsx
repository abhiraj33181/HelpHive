import React, { useContext, useEffect, useState } from 'react'
import { ProviderContext } from '../../context/ProviderContext'
import { assets } from "../../assets/assets";
import { BadgeIndianRupee, BadgeInfo, Calendar, CalendarCheck, CheckCircle2, ChevronRight, Clock, DollarSign, IndianRupee, MapPin, MessageCircleMore, Phone, Plus, Star, TrendingUp, User, Waypoints, X } from "lucide-react";
import { AppContext } from '../../context/AppContext';
import Modal from '../../components/Modal';

const ProviderDashboard = () => {
  const { navigate, pToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment, profileData, updateAppointmentStatus } = useContext(ProviderContext)
  const { slotDateFormat, currencySymbol } = useContext(AppContext)
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  const getGreeting = () => {
    const hour = new Date().getHours(); // 0 - 23

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 20) return "Good Evening";
    return "Good Night";
  };

  useEffect(() => {
    if (pToken) {
      getDashData()
    }
  }, [pToken])

  return profileData && (
    <div className='px-4 py-10 sm:mx-[10%] md:mx-10'>
      <div className='flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-center'>
        {/* left section */}
        <div className='flex items-center gap-5 md:gap-10'>
          <img src={profileData.image} className='h-20 w-20 md:w-30 md:h-30 object-cover rounded-full shadow-md' />
          <div>
            <h1 className='text-xl md:text-4xl font-bold'>{getGreeting()}, {profileData.name}!</h1>
            <p className='md:text-xl text-gray-700 flex gap-2 my-2 items-center'><BadgeInfo /> {profileData.service}</p>
            <div className='flex items-center gap-5'>
              <p className='text-gray-700 flex gap-2 items-center'><MapPin /> {profileData.address.line1}</p>
              <div className='flex items-center gap-1'>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className='font-semibold'>4.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* right section  */}
        <button className='bg-[#2540C8] text-white hover:bg-[#0d249b] cursor-pointer flex items-center justify-center gap-2 py-2 px-4 rounded-xl outline-0'><Plus className='w-5 h-5' /> Update Availablity</button>
      </div>

      {/* tiles part  */}

      <div className='grid gird-cols-1 md:grid-cols-4 gap-5 md:gap-10 mt-10'>
        <div className='bg-white flex py-10 px-5 justify-between items-center rounded-xl shadow-2xl'>
          <div>
            <p className='font-semibold'>Today’s Appointments</p>
            <p className='text-3xl font-bold my-2'>{dashData.appointments}</p>
            <p className='text-green-600'><TrendingUp className='inline w-5 h-5' /> +12% from last week</p>
          </div>
          <div className='h-15 text-green-600 w-15 flex items-center justify-center bg-[#F0FDF4] rounded-xl'>
            <CalendarCheck className='w-8 h-8' />
          </div>
        </div>

        <div className='bg-white flex py-10 px-5 justify-between items-center rounded-xl shadow-2xl'>
          <div>
            <p className='font-semibold'>Pending Request</p>
            <p className='text-3xl font-bold my-2'>2</p>
            <p className='text-green-600'><TrendingUp className='inline w-5 h-5' /> +12% from last week</p>
          </div>
          <div className='h-15 text-[#355DFC] w-15 flex items-center justify-center bg-[#EFF6FF] rounded-xl'>
            <Clock className='w-8 h-8' />
          </div>
        </div>

        <div className='bg-white flex py-10 px-5 justify-between items-center rounded-xl shadow-2xl'>
          <div>
            <p className='font-semibold'>Completed Appointments</p>
            <p className='text-3xl font-bold my-2'>7</p>
            <p className='text-green-600'><TrendingUp className='inline w-5 h-5' /> +12% from last week</p>
          </div>
          <div className='h-15 text-[#9819FA] w-15 flex items-center justify-center bg-[#FAF5FF] rounded-xl'>
            <CheckCircle2 className='w-8 h-8' />
          </div>
        </div>

        <div className='bg-white flex py-10 px-5 justify-between items-center rounded-xl shadow-2xl'>
          <div>
            <p className='font-semibold'>Today’s Earning</p>
            <p className='text-3xl font-bold my-2'>₹{(dashData?.earning ?? 0).toLocaleString('en-IN')}</p>
            <p className='text-green-600'><TrendingUp className='inline w-5 h-5' /> +12% from last week</p>
          </div>
          <div className='h-15 text-[#E7502F] w-15 flex items-center justify-center bg-[#FDF7ED] rounded-xl'>
            <DollarSign className='w-8 h-8' />
          </div>
        </div>
      </div>

      {/* details part */}
      <div className='flex flex-col md:flex-row gap-10 w-full my-12 items-start'>
        {/* left part */}
        <div className='md:w-[70%] bg-white shadow-xl p-5 px-3 rounded-xl min-h-[70vh]'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-5 '>
              <p className='flex items-center gap-2 font-semibold'><Calendar strokeWidth='2.2' className='text-[#2540C8]' /> Today's Schedule</p>
              <p className='hidden md:block text-xs md:text-sm bg-zinc-100 rounded-full py-1 px-3'>{dashData.appointments} Appointments</p>
            </div>
            <button className='text-sm md:text-base flex items-center justify-center  gap1 text-slate-800 hover:bg-zinc-100 cursor-pointer py-1 px-3 duration-300 rounded-xl'>
              View All <ChevronRight />
            </button>
          </div>
          {dashData?.latestAppointments?.length > 0 ? (
            <div className='mt-5 flex flex-col gap-5'>
              {dashData.latestAppointments.filter(appointment => !appointment.cancelled && !appointment.isCompleted).map((item, index) => (
                <div
                  key={index}
                  onClick={() => { setSelectedAppointment(item); setOpen(true); }}
                  className="group flex justify-between w-full h-32 md:h-28 lg:h-36 border border-gray-200/70 rounded-2xl p-5 cursor-pointer bg-gradient-to-r from-white to-gray-50/50 hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200/80 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 hover:scale-[1.01] active:scale-[0.98]"
                >
                  {/* Left Content */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Profile Image */}
                    <div className="flex-shrink-0 h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20 rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/50 group-hover:ring-blue-200/70 transition-all duration-300">
                      <img
                        src={item.userData.image}
                        alt={item.userData.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      {/* Name */}
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                        <p className="text-lg md:text-xl font-bold text-gray-900 truncate group-hover:text-blue-700 pr-2">
                          {item.userData.name}
                        </p>
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 group-hover:text-gray-800">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate max-w-[200px] md:max-w-[250px]">
                          {item.userData.address?.street}, {item.userData.address?.city}
                        </span>
                      </div>

                      {/* Service */}
                      <div className="flex items-center gap-2 text-sm md:text-base text-gray-700 group-hover:text-gray-900">
                        <Waypoints className="h-4 w-4 flex-shrink-0 text-indigo-500 group-hover:text-indigo-600" />
                        <span className="font-medium truncate">{item.provData.service}</span>
                      </div>

                      {/* Amount */}
                      <div className="flex items-center gap-2 text-sm md:text-lg font-bold text-emerald-600 group-hover:text-emerald-700">
                        <BadgeIndianRupee className="h-4 w-4 flex-shrink-0" />
                        <span>₹{item.amount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date/Time - Always visible, responsive positioning */}
                  <div className="flex flex-col items-end gap-1 ml-4 flex-shrink-0">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-200/50 rounded-xl shadow-sm group-hover:shadow-md group-hover:bg-blue-500/20 transition-all duration-300">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:scale-110 transition-transform" />
                      <span className="text-xs md:text-sm font-bold text-blue-900 group-hover:text-blue-800 tracking-tight">
                        {slotDateFormat(item.slotDate)}
                      </span>
                    </div>
                    <span className="text-base md:text-lg font-bold text-gray-800 group-hover:text-blue-900 whitespace-nowrap">
                      {item.slotTime}
                    </span>
                  </div>
                </div>

              ))}

            </div>
          ) : (
            <div className='h-[50vh] flex flex-col items-center justify-center'>
              <Calendar className='w-25 h-25 text-zinc-400' />
              <h1 className='text-2xl font-semibold text-zinc-400 my-2'>No Appointments Today</h1>
              <p className='text-xl text-zinc-400'>Enjoy your free day!</p>
            </div>
          )}

        </div>

       <Modal isOpen={open} onClose={() => { setSelectedAppointment(null); setOpen(false); }}>
  {selectedAppointment && (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
          <Calendar className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
            Booking Details
          </h1>
          <p className="text-gray-500 text-lg mt-1">Manage appointment with {selectedAppointment.userData.name}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - User Info */}
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/50 bg-gradient-to-br from-blue-50 to-indigo-50 p-1">
              <img 
                src={selectedAppointment.userData.image} 
                alt={selectedAppointment.userData.name}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* User Name & Badges */}
            <div className="text-center lg:text-left mt-6 space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-3 rounded-2xl border border-blue-200/50">
                  <User className="h-6 w-6 text-blue-600" />
                  <span className="text-xl md:text-2xl font-bold text-gray-900">
                    {selectedAppointment.userData.name}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-200/50 hover:bg-gray-50 transition-all">
                <MapPin className="h-6 w-6 text-gray-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700 leading-relaxed">
                  <span>{selectedAppointment.userData.address?.street},</span><br />
                  <span className="font-medium">{selectedAppointment.userData.address?.city}</span><br />
                  <span>{selectedAppointment.userData.address?.state} - {selectedAppointment.userData.address?.pincode}</span>
                </div>
              </div>

              {/* Service & Amount */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-200/50 hover:shadow-md transition-all">
                  <Waypoints className="h-5 w-5 text-indigo-600" />
                  <span className="font-semibold text-indigo-900">{selectedAppointment.provData.service}</span>
                </div>
                <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-200/50 shadow-md hover:shadow-lg transition-all">
                  <BadgeIndianRupee className="h-5 w-5 text-emerald-600" />
                  <span className="text-2xl font-bold text-emerald-800">₹{selectedAppointment.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Status */}
        <div className="space-y-8 lg:pt-4">
          {/* Action Buttons */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <MessageCircleMore className="h-8 w-8 text-indigo-600" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => window.location.href = `tel:${selectedAppointment.userData.phone}`}
                className="group relative p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-2 active:scale-95"
              >
                <Phone className="h-7 w-7 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold tracking-tight">Call</span>
              </button>
              
              <button 
                onClick={() => navigate(`/provider/dashboard/chat/${selectedAppointment.userData._id}`)}
                className="group p-5 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-2 active:scale-95"
              >
                <MessageCircleMore className="h-7 w-7 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold tracking-tight">Chat</span>
              </button>
              
              <button className="group p-5 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center gap-2 active:scale-95 cursor-not-allowed opacity-60">
                <MapPin className="h-7 w-7" />
                <span className="text-sm font-semibold tracking-tight">Directions</span>
              </button>
            </div>
          </div>

          {/* Status Section */}
          <div className="space-y-6 pt-8 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <div className="h-6 w-6 text-gray-500"></div>
              Booking Status
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border-2 bg-gradient-to-br from-gray-50 to-white/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-700">Booking Status</span>
                  <div className={`w-3 h-3 rounded-full ${
                    selectedAppointment.isAccepted === 'Pending' || selectedAppointment.isAccepted === 'Appointment Request Cancelled' 
                      ? 'bg-amber-400' 
                      : 'bg-emerald-500'
                  } animate-pulse`} />
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  selectedAppointment.isAccepted === 'Pending' || selectedAppointment.isAccepted === 'Appointment Request Cancelled'
                    ? 'bg-amber-100 text-amber-800 border-2 border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200'
                }`}>
                  {selectedAppointment.isAccepted}
                </span>
              </div>

              <div className="p-5 rounded-2xl border-2 bg-gradient-to-br from-gray-50 to-white/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-700">Payment Status</span>
                  <div className={`w-3 h-3 rounded-full ${
                    selectedAppointment.payment ? 'bg-emerald-500' : 'bg-red-500'
                  } animate-pulse`} />
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold w-full text-center block ${
                  selectedAppointment.payment 
                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-200'
                    : 'bg-red-100 text-red-800 border-2 border-red-200'
                }`}>
                  {selectedAppointment.payment ? 'Paid' : 'Not Paid'}
                </span>
              </div>
            </div>

            {/* Action Buttons for Pending */}
            {selectedAppointment.isAccepted === 'Pending' && (
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                <button 
                  onClick={() => updateAppointmentStatus(selectedAppointment._id, 'Appointment Confirmed')}
                  className="group relative py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-lg"
                >
                  <CheckCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  Accept Booking
                </button>
                <button 
                  onClick={() => updateAppointmentStatus(selectedAppointment._id, 'Appointment Request Cancelled')}
                  className="group py-4 px-8 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:from-red-600 hover:to-rose-700 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-lg"
                >
                  <XCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  Reject Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )}
</Modal>




        {/* right part  */}
        <div className='md:w-[30%] flex flex-col gap-5'>

          <div className='flex-1 bg-white min-h-[35vh] shadow-xl rounded-xl py-5 px-3'>
            <div className='flex items-center justify-between'>
              <p className='flex items-center gap-2 font-semibold'><Clock strokeWidth='2.2' className='text-green-700 w-5 h-5' /> Upcoming</p>
              <button className='flex items-center justify-center gap-2 text-slate-800 hover:bg-zinc-100 cursor-pointer py-1 px-3 duration-300 rounded-xl'>
                View All <ChevronRight />
              </button>
            </div>
            <div className='flex flex-col h-full items-center justify-center'>
              <Calendar className='w-15 h-15 text-zinc-400' />
              <h1 className='text-xxl font-semibold text-zinc-400 my-2'>No upcoming appointments.</h1>
            </div>
          </div>


          <div className='flex-1 bg-white shadow-xl rounded-xl py-5 px-3'>
            <div className='flex items-center justify-between'>
              <p className='flex items-center gap-2 font-semibold'><TrendingUp strokeWidth='2.2' className='text-green-700 w-5 h-5' /> Performance</p>
              <button className='flex items-center justify-center gap-2 text-slate-800 hover:bg-zinc-100 cursor-pointer py-1 px-3 duration-300 rounded-xl'>
                View All <ChevronRight />
              </button>
            </div>
            <div className='flex flex-col h-full justify-center px-3 gap-3'>
              <div className='flex justify-between items-center'>
                <p>User Satisfaction</p>
                <p className='font-semibold'><Star className='inline w-4 h-4 text-yellow-500 fill-yellow-500' /> 4.8/5</p>
              </div>

              <div className='flex justify-between items-center'>
                <p>Completion Rate</p>
                <p className='font-semibold text-green-600'>98%</p>
              </div>

              <div className='flex justify-between items-center'>
                <p>Response Time:</p>
                <p className='font-semibold text-blue-600'><ChevronRight className='inline w-4 h-4' /> 2 min</p>
              </div>

              <div>
                <hr className='outline-0 border-0 h-[1px] bg-slate-400' />
                <button className='text-center font-semibold border border-slate-400 hover:bg-zinc-100 cursor-pointer w-full py-2 mt-5 rounded-xl'>View Fll Analytics</button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard