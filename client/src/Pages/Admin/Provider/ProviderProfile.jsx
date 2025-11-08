import React, { useContext, useEffect, useState } from 'react'
import { ProviderContext } from '../../../context/ProviderContext'
import { AppContext } from '../../../context/AppContext'

const ProviderProfile = () => {
  const { pToken, profileData, setProfileData, getProfileData } = useContext(ProviderContext)
  const { currencySymbol } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (pToken) {
      getProfileData()
    }
  }, [pToken])

  return (
    profileData && (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

          <div className="flex justify-center sm:block">
            <img
              src={profileData.image}
              alt="Profile"
              className="w-40 h-40 sm:w-56 sm:h-56 object-cover rounded-xl border"
            />
          </div>

          <div className="flex-1 space-y-4 text-gray-800">

            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {profileData.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
                <span className="capitalize">{profileData.service}</span>
                <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-full bg-gray-50">
                  {profileData.experience}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">About</h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {profileData.about || 'No description provided.'}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">
                Appointment Fee:
                <span className="ml-1 font-semibold text-gray-900">
                  {isEdit ?
                    <input type='number' onChange={(e) => setProfileData(prev => ({...prev, fees:e.target.value}))} value={profileData.fees} /> :
                    <span>{ currencySymbol }{profileData.fees}</span>
                  }
                </span>
              </p>
            </div>

            <div className='flex gap-3'>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Address:</h3>
              <div>
                <p className="text-sm text-gray-600">{profileData.address.line1}</p>
                <p className="text-sm text-gray-600">{profileData.address.line2}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="available"
                checked={profileData.available}
                className="w-4 h-4 accent-blue-600"
              />
              <label htmlFor="available" className="text-sm text-gray-700">
                Available
              </label>
            </div>

            <button
              onClick={() => setIsEdit(true)}
              className="mt-4 px-5 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default ProviderProfile
