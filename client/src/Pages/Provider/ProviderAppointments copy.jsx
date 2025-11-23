import React, { useContext, useEffect } from "react";
import { ProviderContext } from "../../context/ProviderContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { X } from "lucide-react";

const ProviderAppointments = () => {
  const { pToken, getAppointments, appointments, completeAppointment, cancelAppointment } = useContext(ProviderContext);
  const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext);

  useEffect(() => {
    if (pToken) getAppointments();
  }, [pToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        All Appointments
      </h2>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header (Hidden on small screens) */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-2 px-6 py-3 bg-gray-50 border-b text-sm font-semibold text-gray-700">
          <p>#</p>
          <p>User</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        <div className="divide-y divide-gray-100 max-h-[75vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.reverse().map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <p className="font-medium text-gray-500">{index + 1}</p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image || assets.default_user}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <p className="font-medium text-gray-800">
                    {item.userData.name}
                  </p>
                </div>

                {/* Payment Status */}
                <div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${item.payment
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      }`}
                  >
                    {item.payment ? "Online" : "Cash"}
                  </span>
                </div>

                {/* Age */}
                <p className="hidden md:block">{calculateAge(item.userData.dob)}</p>

                {/* Date & Time */}
                <p className="text-sm text-gray-600">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                {/* Fee */}
                <p className="font-semibold text-gray-800">
                  {currencySymbol}
                  {item.amount}
                </p>

                {
                  item.cancelled ?
                    <p className="text-red-400 text-xs font-medium">Cancelled</p>
                    : item.isCompleted ? <p className="text-green-500 text-xs font-medium">Completed</p> :
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="w-4 h-4 bg-red-600 transition"
                          title="Cancel Appointment"
                        >
                          <X />
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="p-2 rounded-lg hover:bg-green-50 transition"
                          title="Approve Appointment"
                        >
                          <check />
                        </button>
                      </div>

                }

              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderAppointments;
