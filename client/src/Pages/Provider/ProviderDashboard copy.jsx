import React, { useContext, useEffect } from 'react'
import { ProviderContext } from '../../context/ProviderContext'
import { assets } from "../../assets/assets";
import { X } from "lucide-react";
import { AppContext } from '../../context/AppContext';

const ProviderDashboard = () => {
  const { pToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment } = useContext(ProviderContext)
  const { slotDateFormat, currencySymbol } = useContext(AppContext)

  useEffect(() => {
    if (pToken) {
      getDashData()
    }
  }, [])
  return dashData && (
    <div className="m-5 space-y-8">
      <div className="flex flex-wrap gap-5">
        <div className="flex items-center gap-4 bg-white shadow-sm p-5 rounded-2xl border border-gray-100 min-w-[200px] hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="bg-blue-100 p-3 rounded-full">
            <img src={assets.earning_icon} alt="Providers" className="w-10" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {currencySymbol}{dashData.earning}
            </p>
            <p className="text-gray-500 text-sm font-medium">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow-sm p-5 rounded-2xl border border-gray-100 min-w-[200px] hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="bg-green-100 p-3 rounded-full">
            <img
              src={assets.appointments_icon}
              alt="Appointments"
              className="w-10"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {dashData.appointments}
            </p>
            <p className="text-gray-500 text-sm font-medium">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white shadow-sm p-5 rounded-2xl border border-gray-100 min-w-[200px] hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="bg-purple-100 p-3 rounded-full">
            <img
              src={assets.patients_icon}
              alt="Users"
              className="w-10"
            />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {dashData.users}
            </p>
            <p className="text-gray-500 text-sm font-medium">Users</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b">
          <img src={assets.list_icon} alt="List" className="w-6" />
          <p className="font-semibold text-gray-800 text-lg">
            Latest Bookings
          </p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.userData?.image || assets.default_provider}
                    alt="Provider"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-gray-800 font-medium text-sm sm:text-base">
                      {item.userData?.name}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
                </div>

                {
                  item.cancelled ?
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                    : item.isCompleted ? <p className="text-green-500 text-xs font-medium">Completed</p> :
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="p-2 rounded-lg hover:bg-red-50 transition"
                          title="Cancel Appointment"
                        >
                          <img
                            src={assets.cancel_icon}
                            alt="Cancel"
                            className="w-8 md:w-8"
                          />
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="p-2 rounded-lg hover:bg-green-50 transition"
                          title="Approve Appointment"
                        >
                          <img src={assets.tick_icon} alt="Approve" className="w-5 md:w-6" />
                        </button>
                      </div>

                }

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-6 text-sm">
              No recent bookings found.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProviderDashboard