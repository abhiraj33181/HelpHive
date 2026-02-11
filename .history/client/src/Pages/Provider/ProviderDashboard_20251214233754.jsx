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
  const [complete, setComplete] = useState(false)

  // completion 
  const [completeStatus, setCompleteStatus] = useState('Completed Successfully')
  const [remark, setRemark] = useState('')
  const [extraCharge, setExtraCharge] = useState('')
  const [extraChargeReason, setExtraChargeReason] = useState('')


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
            !complete ? (
              <div className='flex flex-col md:flex-row gap-5'>
                <img src={selectedAppointment.userData.image} className='hidden md:block md:w-70 md:h-full rounded-lg object-cover' />
                <div className='w-full'>
                  <h1 className='text-2xl uppercase font-bold border-l-5 py-2 px-3  mt-6 rounded-md bg-blue-100 border-l-blue-600'>Booking Details</h1>
                  <div className='w-full'>
                    <div className='flex flex-col md:flex-row gap-10 mt-5'>
                      {/* left part  */}
                      <div>
                        <p className='font-semibold text-lg flex gap-2 items-center'><User /> {selectedAppointment.userData.name}</p>
                        <p className='flex items-center gap-2 my-1'>
                          <MapPin className='h-8' />
                          <span>{selectedAppointment.userData.address.street} , {selectedAppointment.userData.address.city}, <br /> {selectedAppointment.userData.address.state}, {selectedAppointment.userData.address.pincode}</span>
                        </p>
                        <p>
                          <span className='ml-5 text-blue-800 border rounded-full text-sm bg-blue-100 py-1 px-2'> {selectedAppointment.provData.service}</span>

                          <span className='ml-2 text-green-800 border rounded-full text-sm bg-green-100 py-1 px-2'>₹ {selectedAppointment.amount}</span>
                        </p>
                      </div>

                      {/* right part  */}
                      <div>
                        <h2 className='font-semibold text-lg'>Connect With User</h2>
                        <div className='flex gap-3 justify-center items-center my-2'>
                          <button onClick={() => window.location.href = `tel:${selectedAppointment.userData.phone}`} className='bg-blue-100 text-blue-600 border border-blue-600 hover:text-white flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-blue-600  rounded-md h-10 w-10'><Phone /></button>
                          <button onClick={() => {
                            navigate(`/provider/dashboard/chat/${selectedAppointment.userData._id}`)
                          }} className='bg-green-100 text-green-600 border border-green-600 hover:text-white flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-green-600  rounded-md h-10 w-10'><MessageCircleMore /></button>
                          <button className='bg-amber-100 text-amber-600 border border-amber-600 hover:text-white flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-amber-600  rounded-md h-10 w-10'><MapPin /></button>
                        </div>

                      </div>
                    </div>


                    <hr className='my-5  border-slate-400' />
                    <div className='flex gap-2 flex-col'>
                      <p className='mb-2'><strong>Booking Status :</strong> <span className={`px-3 border rounded-full ${selectedAppointment.isAccepted === 'Pending' || 'Appointment Request Cancelled' ? 'text-amber-600 bg-amber-100 border-amber-600' : 'text-green-700 bg-green-100 border-green-700'}`}>{selectedAppointment.isAccepted}</span></p>
                      <p><strong>Fee Status :</strong> <span className={`px-3 border rounded-full ${selectedAppointment.payment ? 'text-green-700 bg-green-100 border-green-700' : 'text-red-700 bg-red-100 border-red-700'}`}>{selectedAppointment.payment ? 'Paid' : 'Not Paid'}</span></p>
                    </div>

                    {selectedAppointment.isAccepted === 'Pending' && (
                      <div className='mt-5 flex gap-2'>
                        <button onClick={() => updateAppointmentStatus(selectedAppointment._id, 'Appointment Confirmed')} className='w-full border text-blue-600 bg-blue-100 py-2 px-3 text-center cursor-pointer rounded-xl hover:text-white hover:bg-blue-600 transition-all duration-300'>Accept Request</button>
                        <button onClick={() => updateAppointmentStatus(selectedAppointment._id, 'Appointment Request Cancelled')} className='w-full border text-red-600 bg-red-100 py-2 px-3 text-center cursor-pointer rounded-xl hover:text-white hover:bg-red-600 transition-all duration-300'>Reject Request</button>
                      </div>
                    )}

                  </div>
                  <button onClick={() => setComplete(true)} className='bg-blue-600 py-1 px-3 text-white rounded mt-5 float-right cursor-pointer hover:bg-blue-700'>Complete Task</button>
                </div>

              </div>
            ) : (
              <form class="w-full rounded-2xl space-y-6">

                <div className='border-l-5 py-2 px-3  mt-6 rounded-md bg-blue-100 border-l-blue-600'>
                  <h2 class="text-2xl font-semibold text-gray-800  uppercase">Complete Job</h2>
                  <p class="text-sm text-gray-500">
                    Please fill the details before marking the job as completed
                  </p>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      checked={status === "completed"}
                      onChange={() => setStatus("completed")}
                      className="accent-blue-600"
                    />
                    <span>Completed Successfully</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="issue"
                      checked={status === "issue"}
                      onChange={() => setStatus("issue")}
                      className="accent-blue-600"
                    />
                    <span>Completed with Issue</span>
                  </label>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Remarks <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    rows="3"
                    placeholder="Briefly describe the work completed"
                    class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Extra Charges (₹)
                    </label>
                    <input
                      value={extraCharge}
                      onChange={(e) => setExtraCharge(e.target.value)}
                      type="number"
                      placeholder="0"
                      class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Extra Charge Reason
                    </label>
                    <input
                      value={extraChargeReason}
                      onChange={(e) => extraChargeReason(e.target.value)}
                      type="text"
                      placeholder="Reason for extra charge"
                      class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div class="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setComplete(false)}
                    type="button"
                    class="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    class="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                  >
                    Mark as Completed
                  </button>
                </div>

              </form>

            )
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