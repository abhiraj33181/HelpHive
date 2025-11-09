import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const MyAppointments = () => {
  const { backendURL, token, axios, getProvidersData, navigate } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/listAppointment`, { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      toast(error.message)
      console.log(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendURL}/api/user/cancelAppointment`, { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getProvidersData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast(error.message)
      console.log(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Apppointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {
          const { data } = await axios.post(`${backendURL}/api/user/verify-razorpay`, { response }, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointment')
            toast.success(data.message)
          } else {
            console.log(data.message)
            toast.error(data.message)
          }
        } catch (error) {

        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendURL}/api/user/payment-razorpay`, { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])
  return (
    <div className='my-10 md:flex-row gap-12'>
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-6 border-b pb-2">My Appointments</h2>
          <div className="space-y-6">
            {appointments.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm flex flex-col md:flex-row transition hover:shadow-md"
              >
                <div className="md:w-54 flex-shrink-0 flex justify-center items-center">
                  <img
                    className="w-full h-full object-cover rounded-t-lg rounded-b-none md:rounded-none md:rounded-tl-lg md:rounded-bl-lg bg-indigo-50"
                    src={item.provData.image}
                    alt={item.provData.name}
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">{item.provData.name}</h3>
                    <div className="text-sm text-zinc-600">{item.provData.service}</div>
                    <div className="mt-2">
                      <span className="font-xl font-medium text-zinc-700">Address:</span>
                      <div className="text-[14px] text-zinc-500">{item.provData.address.line1}</div>
                      <div className="text-[14px] text-zinc-500">{item.provData.address.line2}</div>
                    </div>
                    <div className="text-xs mt-2 text-[14px]">
                      <span className="font-semibold text-neutral-800">Date & Time:</span>{" "}
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {!item.cancelled && item.payment && !item.isCompleted && (
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                        Paid
                      </span>
                    )}
                    {item.cancelled && !item.isCompleted && (
                      <span className="px-3 py-1 bg-red-50 text-red-500 text-xs rounded-full border border-red-200">
                        Cancelled
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    {!item.cancelled && !item.payment && !item.isCompleted &&  (
                      <button
                        className="flex-1 px-4 py-2 rounded-lg border border-blue-500 text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white transition"
                        onClick={() => appointmentRazorpay(item._id)}
                      >
                        Pay Online
                      </button>
                    )}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        className="flex-1 px-4 py-2 rounded-lg border border-red-600 text-red-600 font-semibold bg-red-100 hover:bg-red-600 hover:text-white transition"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        Cancel
                      </button>
                    )}
                    {item.isCompleted && (
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200">
                        Completed
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAppointments
