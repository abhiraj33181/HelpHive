import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedProvider from '../components/RelatedProviders'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { provId } = useParams()
  const { providers, currencySymbol, backendURL, token, getProvidersData, navigate, axios } = useContext(AppContext);


  const [provInfo, setProvInfo] = useState(null)
  const [providerSlots, setDoctorSlot] = useState([])
  const [slotTime, setSlotTime] = useState()
  const [slotIndex, setSlotIndex] = useState(0)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchProvInfo = async () => {
    const provInfo = providers.find((prov) => prov._id === provId)
    setProvInfo(provInfo)
  }

  const getAvailableSlots = async () => {
    setDoctorSlot([]);

    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM end time

      // 🔹 If it's today, skip past times
      if (i === 0) {
        // Round up to next 30-min slot
        const now = new Date();
        const minutes = now.getMinutes();

        const nextHalfHour = minutes < 30 ? 30 : 0;
        const nextHour = minutes < 30 ? now.getHours() : now.getHours() + 1;

        currentDate.setHours(nextHour);
        currentDate.setMinutes(nextHalfHour);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
      } else {
        // For future days, start from 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlot = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;

        const isSlotAvailable = !(provInfo?.slots_booked?.[slotDate]?.includes(slotTime));

        if (isSlotAvailable) {
          timeSlot.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDoctorSlot(prev => [...prev, timeSlot]);
    }
  };


  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book the appointment')
      return navigate('/auth/login')
    }
    try {
      const date = providerSlots[slotIndex][0].dateTime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(`${backendURL}/api/user/bookAppointment`, { provId, slotDate, slotTime}, { withCredentials: true })
      if (data.success) {
        toast.success(data.message)
        getProvidersData()
        navigate('/dashboard')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchProvInfo()
  }, [providers, provId])

  useEffect(() => {
    getAvailableSlots()
  }, [provInfo])


  return provInfo && (
    <div className='mx-4 sm:mx-[10%] py-20 px-4'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={provInfo.image} />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{provInfo.name} <img src={assets.verified_icon} className='w-5' /></p>

          <div className='flex items-cener gap-2 text-sm mt-1 text-gray-600'>
            <p> {provInfo.service}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{provInfo.experience}</button>
          </div>

          <div className=''>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{provInfo.about}</p>
          </div>
          <p>Approx. Charge:  <span className='text-gray-600'>{currencySymbol} {provInfo.fees}</span></p>
        </div>
      </div>

      {/* booking slot  */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking SLots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {providerSlots.length && providerSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
              <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {providerSlots.length && providerSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6' onClick={bookAppointment}>Book an Appointment</button>
      </div>

      <RelatedProvider provId={provId} service={provInfo.service} />
    </div>
  )
}

export default Appointment