import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedProvider from '../components/RelatedProviders'

const Appointment = () => {
  const { provId } = useParams()
  const { providers, currencySymbol } = useContext(AppContext);
  const [provInfo, setProvInfo] = useState(null)
  const [providerSlots, setDoctorSlot] = useState([])
  const [slotTIme, setSlotTime] = useState()
  const [slotIndex, setSlotIndex] = useState(0)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const fetchDocInfo = async () => {
    const provInfo = providers.find((doc) => doc._id === provId)
    setProvInfo(provInfo)
  }

  const getAvailableSlots = async () => {
    setDoctorSlot([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)

      currentDate.setDate(today.getDate() + i)
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // hours 
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlot = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        timeSlot.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }

      setDoctorSlot(prev => ([...prev, timeSlot]))
    }
  }


  useEffect(() => {
    fetchDocInfo()
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
            <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTIme ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

          <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>

      <RelatedProvider provId={provId} service={provInfo.service}/>
    </div>
  )
}

export default Appointment