import React, { useContext, useEffect } from 'react'
import { ProviderContext } from '../../context/ProviderContext'
import { assets } from "../../assets/assets";
import { BadgeInfo, Calendar, CalendarCheck, CheckCircle2, ChevronRight, Clock, DollarSign, IndianRupee, MapPin, Phone, Plus, Star, TrendingUp, X } from "lucide-react";
import { AppContext } from '../../context/AppContext';

const ProviderDashboard = () => {
  const { navigate, pToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment, profileData, updateAppointmentStatus } = useContext(ProviderContext)
  const { slotDateFormat, currencySymbol } = useContext(AppContext)

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
    } else {
      navigate('/provider')
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
                <div key={index} className='hover:shadow-xl duration-200 bg-zinc-50 rounded-xl py-5 px-3 relative'>
                  <div className='flex items-center'>
                    <div className='flex gap-5 h-full'>
                      <img src={item.userData.image} className='h-23 w-23 rounded-full object-cover' />
                      <div>
                        <p className='text-xl font-semibold'>{item.userData.name}</p>
                        <p className='flex items-center gap-1 text-slate-700'><BadgeInfo className='w-5 h-5' />{item.provData.service} . <span className='font-semibold'>₹{item.amount.toLocaleString('en-IN')}</span></p>
                        <p className='flex items-center gap-1 text-slate-700'><Phone className='w-5 h-5' />{item.userData.phone}</p>
                        <p className='flex items-center gap-1 text-slate-700'><MapPin className='w-5 h-5' />Near Bus Stand Fatehpur, Gaya</p>

                      </div>
                    </div>
                  </div>
                  {item.isAccepted === 'Pending' &&
                    <div className='flex gap-3 border-t-1 border-slate-400 py-2 justify-end mt-2'>
                      <button onClick={() => updateAppointmentStatus(item._id, 'Appointment Confirmed')} className='bg-[#3d73f4] text-semibold text-white rounded py-1 px-3'>Accept</button>
                      <button onClick={() => updateAppointmentStatus(item._id, 'Appointment Request Cancelled')} className='text-semibold border border-slate-slate-700 rounded py-1 px-3'>Reject</button>
                    </div>}
                  <p className='text-right border-t-1 md:border-t-0 border-slate-400 pt-3 mt-3 md:absolute top-3 right-3 font-semibold text-xs'>
                    <span className='bg-amber-200 py-1 px-3 rounded-md mr-2'>{item.isAccepted}</span>
                    <span className={` py-1 px-3 rounded-md text-zinc-900 ${item.payment ? 'bg-green-200' : 'bg-red-200'}`}>{item.payment ? 'Paid' : 'Not Paid'}</span>
                  </p>
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