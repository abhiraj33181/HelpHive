import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedProvider from '../components/RelatedProviders'
import { toast } from 'react-toastify'

const Appointment = () => {
  const { provId } = useParams()
  const { providers, currencySymbol, backendURL, token, getProvidersData, navigate, axios } = useContext(AppContext)

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
    setDoctorSlot([])

    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0) // 9:00 PM end time

      // If it's today, skip past times
      if (i === 0) {
        const now = new Date()
        const minutes = now.getMinutes()

        const nextHalfHour = minutes < 30 ? 30 : 0
        const nextHour = minutes < 30 ? now.getHours() : now.getHours() + 1

        currentDate.setHours(nextHour)
        currentDate.setMinutes(nextHalfHour)
        currentDate.setSeconds(0)
        currentDate.setMilliseconds(0)
      } else {
        // For future days, start from 10:00 AM
        currentDate.setHours(10, 0, 0, 0)
      }

      const timeSlot = []

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const day = currentDate.getDate()
        const month = currentDate.getMonth() + 1
        const year = currentDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime

        const isSlotAvailable = !(provInfo?.slots_booked?.[slotDate]?.includes(slotTime))

        if (isSlotAvailable) {
          timeSlot.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDoctorSlot((prev) => [...prev, timeSlot])
    }
  }

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

      const slotDate = day + '_' + month + '_' + year

      const { data } = await axios.post(
        `${backendURL}/api/user/bookAppointment`,
        { provId, slotDate, slotTime },
        { withCredentials: true }
      )
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

  return (
    provInfo && (
      <div className="mx-4 sm:mx-[10%] py-5 px-4 min-h-screen">
        <div className="mx-4 sm:mx-8 lg:mx-24 py-8 sm:py-12 lg:py-16">
          {/* Top section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Provider image card */}
            <div className="w-full lg:w-80">
              <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-4">
                <img
                  className="w-full aspect-square object-cover rounded-xl bg-slate-100"
                  src={provInfo.image}
                  alt={provInfo.name}
                />
              </div>
            </div>

            {/* Provider info card */}
            <div className="flex-1">
              <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-slate-900">
                      {provInfo.name}
                      <img src={assets.verified_icon} className="w-5 h-5" alt="verified" />
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
                      <p className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {provInfo.service}
                      </p>
                      <span className="h-4 w-px bg-slate-200 hidden sm:inline-block" />
                      <button className="py-1 px-3 border border-slate-200 text-xs rounded-full bg-slate-50 text-slate-600">
                        {provInfo.experience}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Approx. Charge
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      {currencySymbol} {provInfo.fees}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    About
                    <img src={assets.info_icon} alt="info" className="w-4 h-4" />
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 max-w-2xl">
                    {provInfo.about}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking section */}
          <div className="mt-10 lg:mt-12 lg:ml-80 lg:pl-6">
            <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <p className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                  Booking Slots
                </p>
                <p className="text-xs text-slate-400">
                  Next 7 days · 10:00 AM – 9:00 PM
                </p>
              </div>

              {/* Date pills */}
              <div className="flex gap-3 items-center w-full overflow-x-auto pb-2 -mx-1">
                {providerSlots.length > 0 &&
                  providerSlots.map((item, index) => (
                    <button
                      type="button"
                      onClick={() => setSlotIndex(index)}
                      key={index}
                      className={`mx-1 flex flex-col items-center justify-center text-center py-3 min-w-[3.5rem] rounded-xl border text-xs sm:text-sm transition-all ${
                        slotIndex === index
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <span className="font-medium">
                        {item[0] && daysOfWeek[item[0].dateTime.getDay()]}
                      </span>
                      <span className="mt-0.5 text-base font-semibold">
                        {item[0] && item[0].dateTime.getDate()}
                      </span>
                    </button>
                  ))}
              </div>

              {/* Time slots */}
              <div className="mt-5">
                <p className="text-xs font-medium text-slate-500 mb-2">
                  Available time
                </p>
                <div className="flex items-center gap-2 w-full overflow-x-auto pb-1 -mx-1">
                  {providerSlots.length > 0 &&
                    providerSlots[slotIndex]?.map((item, index) => (
                      <button
                        type="button"
                        onClick={() => setSlotTime(item.time)}
                        key={index}
                        className={`mx-1 text-xs sm:text-sm font-medium flex-shrink-0 px-4 py-2 rounded-full border transition-all ${
                          item.time === slotTime
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'text-slate-500 border-slate-200 hover:border-slate-400 bg-white'
                        }`}
                      >
                        {item.time.toLowerCase()}
                      </button>
                    ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  className="inline-flex justify-center items-center gap-2 bg-slate-900 text-white text-sm font-medium px-6 sm:px-10 py-3 rounded-full shadow-sm hover:bg-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={bookAppointment}
                  disabled={!slotTime || !providerSlots.length}
                >
                  Book an Appointment
                </button>
                <p className="text-xs text-slate-400">
                  You will receive confirmation and details on your dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* Related providers */}
          <div className="mt-10">
            <RelatedProvider provId={provId} service={provInfo.service} />
          </div>
        </div>
      </div>
    )
  )
}

export default Appointment
