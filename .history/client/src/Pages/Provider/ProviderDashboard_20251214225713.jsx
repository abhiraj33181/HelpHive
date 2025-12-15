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

       <Modal isOpen={open} onClose={() => { setSelectedAppointment(null); setOpen(false) }}>
  {selectedAppointment && (
    <div className="max-w-md space-y-5 p-2 sm:p-4">
      {/* Profile Card */}
      <div className="relative bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 rounded-3xl p-6 border border-white/50 shadow-xl backdrop-blur-sm">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur opacity-75 animate-pulse" />
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-4 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/80 -rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src={selectedAppointment.userData.image} 
              alt={selectedAppointment.userData.name}
              className="w-full h-full object-cover rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
          <h2 className="text-2xl font-black text-center text-gray-900 mb-2 tracking-tight">
            {selectedAppointment.userData.name}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{selectedAppointment.userData.address?.city}</span>
          </div>
        </div>
      </div>

      {/* Price Tag */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-center">
        <div className="flex items-baseline justify-center gap-2 mb-1">
          <BadgeIndianRupee className="h-7 w-7 -rotate-3" />
          <span className="text-3xl font-black drop-shadow-lg">{selectedAppointment.amount.toLocaleString('en-IN')}</span>
        </div>
        <div className="text-emerald-100 font-medium text-sm uppercase tracking-wider">{selectedAppointment.provData.service}</div>
      </div>

      {/* Action Circle Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button 
          onClick={() => window.location.href = `tel:${selectedAppointment.userData.phone}`}
          className="group relative p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-3xl shadow-xl hover:shadow-2xl hover:rotate-12 hover:scale-105 transition-all duration-300 aspect-square flex flex-col items-center justify-center active:scale-95"
        >
          <Phone className="h-7 w-7 mb-1 group-hover:scale-125 transition-transform" />
          <span className="text-xs font-bold tracking-tight">Call</span>
        </button>
        
        <button 
          onClick={() => navigate(`/provider/dashboard/chat/${selectedAppointment.userData._id}`)}
          className="group p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl shadow-xl hover:shadow-2xl hover:rotate-12 hover:scale-105 transition-all duration-300 aspect-square flex flex-col items-center justify-center active:scale-95"
        >
          <MessageCircleMore className="h-7 w-7 mb-1 group-hover:scale-125 transition-transform" />
          <span className="text-xs font-bold tracking-tight">Chat</span>
        </button>
        
        <button className="p-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 aspect-square flex flex-col items-center justify-center cursor-not-allowed opacity-70">
          <MapPin className="h-7 w-7 mb-1" />
          <span className="text-xs font-bold tracking-tight">Map</span>
        </button>
      </div>

      {/* Status Bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/50 border-2 border-amber-200 shadow-inner">
          <span className="font-semibold text-gray-800">Booking</span>
          <div className={`px-4 py-2 rounded-2xl font-bold text-sm shadow-lg ${
            selectedAppointment.isAccepted === 'Pending' || selectedAppointment.isAccepted === 'Appointment Request Cancelled'
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-orange-300'
              : 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-emerald-300'
          }`}>
            {selectedAppointment.isAccepted}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 shadow-inner">
          <span className="font-semibold text-gray-800">Payment</span>
          <div className={`px-4 py-2 rounded-2xl font-bold text-sm shadow-lg w-full text-center ${
            selectedAppointment.payment 
              ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-emerald-300'
              : 'bg-gradient-to-r from-red-400 to-rose-500 text-white shadow-red-300'
          }`}>
            {selectedAppointment.payment ? 'PAID' : 'PENDING'}
          </div>
        </div>
      </div>

      {/* Address Footer */}
      <div className="p-5 rounded-2xl bg-gradient-to-t from-slate-950/5 to-transparent border border-slate-200/50 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div className="text-sm text-gray-700 space-y-1 flex-1">
            <div className="font-semibold">{selectedAppointment.userData.address?.street}</div>
            <div>{selectedAppointment.userData.address?.city}, {selectedAppointment.userData.address?.state}</div>
            <div className="text-xs opacity-75">{selectedAppointment.userData.address?.pincode}</div>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      {selectedAppointment.isAccepted === 'Pending' && (
        <div className="grid grid-cols-2 gap-2 pt-4 -mx-2">
          <button 
            onClick={() => updateAppointmentStatus(selectedAppointment._id, 'Appointment Confirmed')}
            className="group py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-lg tracking-tight active:scale-95"
          >
            <span className="flex items-center gap-2 justify-center">
              <CheckCircle className="h-6 w-6 group-hover:scale-110" />
              Accept
            </span>
          </button>
          <button 
            onClick={() => updateAppointmentStatus(selectedAppointment._id, 'Appointment Request Cancelled')}
            className="group py-4 px-6 bg-gradient-to-r from-red-500 via-rose-600 to-red-600 text-white font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 hover:from-red-600 hover:to-rose-700 transition-all duration-300 text-lg tracking-tight active:scale-95"
          >
            <span className="flex items-center gap-2 justify-center">
              <XCircle className="h-6 w-6 group-hover:scale-110" />
              Reject
            </span>
          </button>
        </div>
      )}
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