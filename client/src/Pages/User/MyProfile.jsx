import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import { Camera, Check, Phone, Star, User } from "lucide-react";

const MyProfile = () => {

  const [activeTab, setActiveTab] = useState('About')
  const { userData, setUserData, token, backendURL, axios, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);

  const [image, setImage] = useState(false)


  const statesOfIndia = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  const inputCSS = `md:w-1/3 py-1 px-2 rounded border border-gray-400 outline-0 ${isEdit ? '' : 'bg-gray-100 text-gray-500 cursor-not-allowed disabled:opacity-75'} `

  const changeTab = async (tabname) => {
    setIsEdit(false)
    await loadUserProfileData()
    setActiveTab(tabname)
  }

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('street', userData.address.street)
      formData.append('city', userData.address.city)
      formData.append('state', userData.address.state)
      formData.append('pincode', userData.address.pincode)
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(`${backendURL}/api/user/updateProfile`, formData, { withCredentials: true })
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
    <div className="mx-4 my-5 sm:mx-[10%]">
      <div>
        <h1 className='text-3xl font-semibold'>My Profile</h1>
        <p className='text-md md:text-xl text-zinc-600'>Refresh your personal details</p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-5">

        {/* left side  */}
        <div className=" bg-white rounded-xl md:w-1/3 p-5">
          <div className="mb-10 flex flex-col items-center relative">
            <img src={image ? URL.createObjectURL(image) : userData.image} className="w-40 h-40 rounded-full object-cover" />
            <div className="absolute top-0 right-0 flex flex-col gap-2">
              <label htmlFor="image" className="flex items-center justify-center bg-white border border-salte-900 h-10 w-10 rounded-full hover:bg-gray-100 cursor-pointer">
                <Camera />
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
              </label>
              {image && <div onClick={() => updateUserProfileData()} className="flex items-center justify-center bg-green-600 text-white h-10 w-10 rounded-full hover:bg-green-700 cursor-pointer"><Check /></div>}
            </div>
            <p className="text-2xl font-semibold">{userData.name}</p>
          </div>

          {/* side menu  */}
          <div className="flex flex-col gap-2">
            <p className={`flex gap-2 items-center ${activeTab === 'About' ? 'bg-[#DBEAFF] text-[#355DFC]  hover:bg-[#DBEAFF] border border-[#355DFC]' : 'bg-[#F3F4F6] border border-[#F3F4F6] hover:bg-[#dddddd]'}  rounded p-3 cursor-pointer font-semibold`} onClick={() => changeTab('About')}><User /> About</p>
            <p className={`flex gap-2 items-center ${activeTab === 'Contact Information' ? 'bg-[#DBEAFF] text-[#355DFC]  border-[#355DFC] border' : 'bg-[#F3F4F6] hover:bg-[#dddddd] border border-[#F3F4F6]'}  rounded p-3 cursor-pointer font-semibold`} onClick={() => changeTab('Contact Information')}><Phone /> Contact Information</p>
            <p className={`flex gap-2 items-center ${activeTab === 'Rating' ? 'bg-[#DBEAFF] text-[#355DFC]  border-[#355DFC] border' : 'bg-[#F3F4F6] hover:bg-[#dddddd] border border-[#F3F4F6]'} rounded p-3 cursor-pointer font-semibold`} onClick={() => setActiveTab('Rating')}><Star />Ratings & Review</p>
          </div>
        </div>

        {/* right side  */}
        <div className=" bg-white rounded-xl w-full p-5">
          <div className="flex items-center justify-between my-5">
            <p className="text-2xl font-semibold capitalize">{activeTab}</p>
            {
              activeTab === 'Rating' || !isEdit && (
                <button className="text-sm bg-[#2D2E2E] py-2 px-5 rounded text-white flex items-center justify-center gap-2 hover:bg-[#0f0f0f]" onClick={() => setIsEdit(prev => !prev)}>Edit</button>
              )
            }

            {
              isEdit && (
                <div className="flex gap-2 items-center">
                  <button className="text-sm border border-[#2D2E2E] py-2 px-5 rounded text-[#2D2E2E] flex items-center justify-center gap-2 hover:bg-[#ececec]" onClick={() => { loadUserProfileData(); setIsEdit(prev => !prev) }}>Cancel</button>
                  <button className="text-sm bg-[#2D2E2E] py-2 px-5 rounded text-white flex items-center justify-center gap-2 hover:bg-[#0f0f0f]" onClick={() => updateUserProfileData()}>Save</button>
                </div>
              )
            }

          </div>

          {activeTab === 'About' && (
            <div>
              <div className="flex flex-col mb-5 w-full">
                <label htmlFor="name" className="font-semibold">Full Name</label>
                <input type="text"
                  placeholder="eg. John Doe"
                  id="name"
                  className={inputCSS} disabled={!isEdit} value={userData.name}
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>


              <div className="flex flex-col mb-5">
                <label className="font-semibold">Gender</label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    checked={userData.gender === "Male"}
                    className="accent-slate-800"
                    disabled={!isEdit}
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    checked={userData.gender === "Female"}
                    disabled={!isEdit}
                    className="accent-slate-800"
                  />
                  Female
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    checked={userData.gender === "Others"}
                    disabled={!isEdit}
                    className="accent-slate-800"
                  />
                  Others
                </label>
              </div>



              <div className="flex flex-col mb-5 w-full">
                <label htmlFor="dob" className="font-semibold">Date of Birth</label>
                <input type="date" id="dob" className={inputCSS} disabled={!isEdit} value={userData.dob} onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              </div>



            </div>
          )}

          {activeTab === "Contact Information" && (
            <div>

              <div className="flex flex-col mb-5 w-full">
                <label htmlFor="email" className="font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="eg. john@gmail.com"
                  id="email"
                  className="md:w-1/3 py-1 px-2 rounded border border-gray-400 bg-gray-100 text-gray-500 cursor-not-allowed disabled:opacity-75"
                  disabled value={userData.email}
                />
              </div>

              <div className="flex flex-col mb-5 w-full">
                <label htmlFor="phone" className="font-semibold">Phone</label>
                <input type="number" placeholder="eg. +91 00000 00000 " id="phone" className={inputCSS} disabled={!isEdit} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData?.phone ?? ''} />
              </div>

              <p className="font-bold">Address</p>


              <div className="flex flex-col md:flex-row md:gap-5">
                <div className="flex flex-col mb-5 md:w-1/2">
                  <label htmlFor="street" className="font-semibold">House No. / Street</label>
                  <input type="text" placeholder="eg. Near Bus Stand" id="street" className={`py-1 px-2 rounded border border-gray-400 outline-0 w-full ${isEdit ? '' : 'bg-gray-100 text-gray-500 cursor-not-allowed disabled:opacity-75'}`} disabled={!isEdit} value={userData.address.street} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, street: e.target.value }, }))} />
                </div>

                <div className="flex flex-col mb-5 md:w-1/2">
                  <label htmlFor="city" className="font-semibold">City</label>
                  <input type="text" placeholder="eg. Gaya" id="city" className={`py-1 px-2 rounded border border-gray-400 outline-0 w-full ${isEdit ? '' : 'bg-gray-100 text-gray-500 cursor-not-allowed disabled:opacity-75'}`} disabled={!isEdit} value={userData.address.city} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value }, }))} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:gap-5">
                <div className="flex flex-col mb-5 md:w-1/2">
                  <label htmlFor="street" className="font-semibold">State</label>
                  <select className={`py-1 px-2 rounded border border-gray-400 outline-0 w-full ${isEdit ? '' : 'bg-gray-100 text-gray-500 cursor-not-allowed disabled:opacity-75'}`} disabled={!isEdit} value={userData.address.state} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value }, }))}>
                    {statesOfIndia.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col mb-5 md:w-1/2">
                  <label htmlFor="pincode" className="font-semibold">Pin Code</label>
                  <input type="number" placeholder="eg. 856545" id="pincode" className={`py-1 px-2 rounded border border-gray-400 outline-0 w-full ${isEdit ? '' : 'bg-gray-100 text-gray-500 cursor-not-allowed disabled:opacity-75'}`} disabled={!isEdit} value={userData.address.pincode} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, pincode: e.target.value }, }))} />
                </div>
              </div>

            </div>
          )}

          {activeTab === 'Rating' && (
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl overflow-hidden p-5">

                <div className="flex gap-5 items-center">
                  <img src="https://i.pinimg.com/736x/05/f3/1c/05f31cf56adba619a88dc524e47a2d89.jpg" className="w-12 h-12 md:w-30 md:h-30 rounded-full object-cover" />

                  <div>
                    <p className="text-xl md:text-2xl font-semibold">Akshay Kumar</p>
                    <p className="md:text-md text-gray-700">Great Service , Very Fast!</p>
                  </div>
                </div>


                <div>
                  <p className="flex my-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    ))}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-2xl">4.5 / 5</p>
                    <p className="font-semibold">25 Dec. 2025</p>
                  </div>
                </div>

              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default MyProfile;
