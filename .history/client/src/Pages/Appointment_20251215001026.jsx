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

  const UserBookingForm = () => {
    const [formData, setFormData] = useState({
      service: "",
      description: "",
      address: "",
      date: "",
      timeSlot: "",
      phone: "",
      urgency: "normal",
      photos: [],
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleFileChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        photos: e.target.files,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Booking Data:", formData);
      // yahan API call karna
    };

    useEffect(() => {
      fetchProvInfo()
    }, [providers, provId])

    useEffect(() => {
      getAvailableSlots()
    }, [provInfo])

    return (
      provInfo && (

        <div className="mx-4 sm:mx-[10%] py-5 px-4 min-h-screen">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 space-y-6"
            >
              {/* Header */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Book a Service
                </h2>
                <p className="text-sm text-gray-500">
                  Fill the details to book your service
                </p>
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="">Select service</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="ac">AC Repair</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your problem *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select slot</option>
                    <option value="morning">Morning (9–12)</option>
                    <option value="afternoon">Afternoon (12–4)</option>
                    <option value="evening">Evening (4–8)</option>
                  </select>
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Photos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos (optional)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="urgency"
                      value="normal"
                      checked={formData.urgency === "normal"}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    Normal
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="urgency"
                      value="urgent"
                      checked={formData.urgency === "urgent"}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    Urgent
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  Book Service
                </button>
              </div>
            </form>
          </div>
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
                        className={`mx-1 flex flex-col items-center justify-center text-center py-3 min-w-[3.5rem] rounded-xl border text-xs sm:text-sm transition-all ${slotIndex === index
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
                          className={`mx-1 text-xs sm:text-sm font-medium flex-shrink-0 px-4 py-2 rounded-full border transition-all ${item.time === slotTime
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
