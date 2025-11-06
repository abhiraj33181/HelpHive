import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const MyAppointments = () => {
  const { backendURL, token, axios } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const getUserAppointments = async () => {
    try {
      const {data} = await axios.get(`${backendURL}/api/user/listAppointment`, {headers : {token}})
      if(data.success){
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
      }
    } catch (error) {
      toast(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    if(token){
      getUserAppointments()
      console.log(appointments)
      
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
                      <span className="font-medium text-zinc-700">Address:</span>
                      <div className="text-xs text-zinc-500">{item.provData.address.line1}</div>
                      <div className="text-xs text-zinc-500">{item.provData.address.line2}</div>
                    </div>
                    <div className="text-xs mt-2">
                      <span className="font-medium text-neutral-800">Date & Time:</span>{" "}
                      {item.slotDate} | {item.slotTime}
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="w-1/2 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors">
                      Pay Online
                    </button>
                    <button className="w-1/2 py-2 rounded-lg border border-red-500 text-red-600 font-semibold bg-red-50 hover:bg-red-600 hover:text-white transition-colors">
                      Cancel
                    </button>
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
