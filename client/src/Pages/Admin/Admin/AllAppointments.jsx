import { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { AppContext } from "../../../context/AppContext";
import { assets } from "../../../assets/assets";
import {X} from 'lucide-react'

const AllAppointments = () => {
  const { aToken, appointments = [], getAllAppointments, slotDateFormat, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currencySymbol, axios } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Appointments
      </h2>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_0.8fr_2fr_2fr_1fr_1fr] bg-gray-100 text-gray-700 font-medium py-3 px-6 border-b">
          <p>#</p>
          <p>User</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Provider</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* Data Rows */}
        <div className="max-h-[75vh] overflow-y-auto">
          {appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2fr_0.8fr_2fr_2fr_1fr_1fr] items-center gap-3 text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition"
              >
                {/* Index */}
                <p className="max-sm:hidden">{index + 1}</p>

                {/* User */}
                <div className="flex items-center gap-3 min-w-[150px]">
                  <img
                    src={item.userData?.image || assets.default_user}
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                  <p className="font-medium">{item.userData?.name}</p>
                </div>

                {/* Age */}
                <p className="max-sm:hidden">
                  {item.userData?.dob ? calculateAge(item.userData.dob) : "-"}
                </p>

                {/* Slot */}
                <p>
                  {slotDateFormat(item.slotDate)},{" "}
                  <span className="font-medium">{item.slotTime}</span>
                </p>

                {/* Provider */}
                <div className="flex items-center gap-3 min-w-[150px]">
                  <img
                    src={item.provData?.image || assets.default_provider}
                    alt="Provider"
                    className="w-9 h-9 rounded-full object-cover border bg-gray-100"
                  />
                  <p>{item.provData?.name}</p>
                </div>

                {/* Fee */}
                <p className="font-semibold">
                  {currencySymbol}
                  {item.amount}
                </p>

                {/* Status */}
                {item.cancelled ? (
                  <p className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-full w-fit">
                    Cancelled
                  </p>
                ) : (
                  item.isCompleted ? <span className="px-3 py-1 bg-green-50 text-green-600 text-xs rounded-full border border-green-200 w-fit">Completed</span> : <div onClick={() => cancelAppointment(item._id)} className="bg-red-400 flex items-center justify-center text-white rounded-full w-fit p-1 hover:bg-red-600 cursor-pointer">
                    <X />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-gray-500 text-sm">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
