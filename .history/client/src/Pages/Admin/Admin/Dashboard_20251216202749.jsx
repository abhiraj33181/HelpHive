import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { assets } from "../../../assets/assets";
import { X } from "lucide-react";
import { AppContext } from "../../../context/AppContext";

const Dashboard = () => {
  const { aToken, cancelAppointment, getDashData, dashData, slotDateFormat } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, []);

  return (
    dashData && (
      <div className="m-5 space-y-8">
        {/* Top stats */}
        <div className="grid gap-5 md:grid-cols-3">
          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm shadow-sm p-5 rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-2xl">
              <img src={assets.doctor_icon} alt="Providers" className="w-9" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">
                {dashData.providers}
              </p>
              <p className="text-xs font-medium tracking-wide text-slate-500">
                Providers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm shadow-sm p-5 rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 rounded-2xl">
              <img
                src={assets.appointments_icon}
                alt="Appointments"
                className="w-9"
              />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">
                {dashData.appointments}
              </p>
              <p className="text-xs font-medium tracking-wide text-slate-500">
                Appointments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm shadow-sm p-5 rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="bg-gradient-to-br from-violet-100 to-violet-200 p-3 rounded-2xl">
              <img
                src={assets.patients_icon}
                alt="Users"
                className="w-9"
              />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">
                {dashData.users}
              </p>
              <p className="text-xs font-medium tracking-wide text-slate-500">
                Users
              </p>
            </div>
          </div>
        </div>

        {/* Latest bookings */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-slate-50 w-8 h-8">
                <img src={assets.list_icon} alt="List" className="w-4" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-base">
                  Latest Bookings
                </p>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                  Recent activity
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.provData?.image || assets.default_provider}
                      alt="Provider"
                      className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm"
                    />
                    <div>
                      <p className="text-slate-900 font-medium text-sm sm:text-base">
                        {item.provData?.name}
                      </p>
                      <p className="text-slate-500 text-xs sm:text-[13px]">
                        {slotDateFormat(item.slotDate)}
                      </p>
                    </div>
                  </div>

                  {item.cancelled ? (
                    <span className="inline-flex items-center justify-center rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] font-medium text-red-600">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="inline-flex items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-600">
                      Completed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => cancelAppointment(item._id)}
                      className="inline-flex items-center justify-center rounded-full bg-rose-500/90 hover:bg-rose-600 text-white p-1.5 shadow-sm hover:shadow-md transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-7 text-sm">
                No recent bookings found.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
