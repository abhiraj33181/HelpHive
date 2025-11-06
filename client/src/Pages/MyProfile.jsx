import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendURL, axios, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('line1', userData.address.line1)
      formData.append('line2', userData.address.line2)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(`${backendURL}/api/user/updateProfile`, formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md flex flex-col items-center gap-4 p-8">

        {isEdit ?
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img src={image ? URL.createObjectURL(image) : userData.image} className="w-24 h-24 object-cover rounded-full ring-2 ring-gray-200" />
              {!image && (
                <img
                  src={assets.upload_icon}
                  alt="Upload Icon"
                  className="w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              )}
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          :
          <img
            src={userData.image}
            className="w-24 h-24 object-cover rounded-full ring-2 ring-gray-200"
            alt="Profile"
          />
        }

        {isEdit ? (
          <input
            type="text"
            className="text-center text-lg font-medium border-b mb-1 focus:outline-none focus:border-blue-400 transition col-span-2"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
        )}
        <p className="text-gray-500 text-sm">{userData.email}</p>
        <div className="w-full mt-6 space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-gray-400 text-xs uppercase">Contact</span>
            <div className="text-gray-700">
              Phone:
              {isEdit ?
                <input className="w-full border-b-2 border-blue-300 bg-transparent px-2 py-2 focus:outline-none focus:border-blue-600 text-gray-900 transition" type="text" value={userData.phone}
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} /> :
                <span className="ml-2">{userData.phone}</span>
              }
            </div>
            <div className="text-gray-700">
              Address:
              {isEdit ?
                <span className="flex flex-col gap-1 ml-2">
                  <input className="w-full border-b-2 border-blue-300 bg-transparent px-2 py-2 focus:outline-none focus:border-blue-600 text-gray-900 transition" type="text" value={userData?.address?.line1 || ''}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input className="w-full border-b-2 border-blue-300 bg-transparent px-2 py-2 focus:outline-none focus:border-blue-600 text-gray-900 transition" type="text" value={userData?.address?.line2 || ''}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </span> :
                <span className="ml-2">
                  {userData?.address?.line1 || ''}<br />{userData?.address?.line2 || ''}
                </span>
              }
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-gray-400 text-xs uppercase">Basic Info</span>
            <div className="text-gray-700">
              Gender:
              {isEdit ? (
                <select
                  className="w-full border-b-2 border-blue-300 bg-transparent px-2 py-2 focus:outline-none focus:border-blue-600 text-gray-900 transition"
                  value={userData.gender}
                  onChange={e =>
                    setUserData(prev => ({ ...prev, gender: e.target.value }))
                  }
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span className="ml-2">{userData.gender}</span>
              )}
            </div>
            <div className="text-gray-700">
              Birthday:
              {isEdit ? (
                <input
                  className="w-full border-b-2 border-blue-300 bg-transparent px-2 py-2 focus:outline-none focus:border-blue-600 text-gray-900 transition"
                  type="date"
                  value={userData.dob}
                  onChange={e =>
                    setUserData(prev => ({ ...prev, dob: e.target.value }))
                  }
                />
              ) : (
                <span className="ml-2">{userData.dob}</span>
              )}
            </div>
          </div>
        </div>
        {isEdit ? <button
          className="mt-4 px-6 py-2 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition"
          onClick={updateUserProfileData}
        >
          Save
        </button> :
          <button
            className="mt-4 px-6 py-2 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </button>}
      </div>
    </div>
  );
};

export default MyProfile;
