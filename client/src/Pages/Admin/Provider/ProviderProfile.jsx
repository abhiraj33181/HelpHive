import React, { useContext, useEffect, useState } from 'react'
import { ProviderContext } from '../../../context/ProviderContext'
import { AppContext } from '../../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const ProviderProfile = () => {
  const { pToken, profileData, setProfileData, getProfileData, backendURL } = useContext(ProviderContext)
  const { currencySymbol } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(`${backendURL}/api/provider/update-profile`, updateData, { headers: { pToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (pToken) {
      getProfileData()
    }
  }, [pToken])

  return (
    profileData && (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-8 bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-10 transition-all duration-300 hover:shadow-lg">

          <div className="flex justify-center sm:justify-start">
            <img
              src={profileData.image}
              alt="Profile"
              className="w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-2xl border border-gray-200 shadow-sm"
            />
          </div>

          <div className="flex-1 space-y-5 text-gray-800">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {profileData.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
                <span className="capitalize bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs font-medium border border-blue-200">
                  {profileData.service}
                </span>
                <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-md bg-gray-50 font-medium">
                  {profileData.experience}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
              <p className="text-sm leading-relaxed text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
                {profileData.about || 'No description provided.'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Appointment Fee</h3>
              <div className="flex items-center gap-2">
                {isEdit ? (
                  <input
                    type="number"
                    className="w-24 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                    value={profileData.fees}
                  />
                ) : (
                  <span className="font-semibold text-gray-900">{currencySymbol}{profileData.fees}</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Address</h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  {isEdit ? (
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={profileData.address?.line1 || ""}
                    />
                  ) : (
                    <span className="block bg-gray-50 border border-gray-100 rounded-md px-2 py-1">
                      {profileData.address?.line1 || "Not Provided"}
                    </span>
                  )}
                </p>

                <p className="text-sm text-gray-600">
                  {isEdit ? (
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={(e) =>
                        setProfileData(prev => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={profileData.address?.line2 || ""}
                    />
                  ) : (
                    <span className="block bg-gray-50 border border-gray-100 rounded-md px-2 py-1">
                      {profileData.address?.line2 || "Not Provided"}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="available"
                checked={profileData.available}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
                onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              />
              <label htmlFor="available" className="text-sm text-gray-700 select-none">
                Available for Appointments
              </label>
            </div>

            <div className="pt-4">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-6 py-2 text-sm font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 shadow-sm"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-6 py-2 text-sm font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    )
  )
}

export default ProviderProfile
