import React, { useState } from "react";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Abhishek Raj",
    image: "https://scontent.fjai12-1.fna.fbcdn.net/v/t39.30808-6/457099340_1553158288944079_9117185733565955047_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Ek_ONcjBRuAQ7kNvwG7NgsQ&_nc_oc=AdlGyYEX2Vtg5Rniirb97cXxjEtAVTXIdomwv_l-1onfsDClzSDS9aiVfJ1MxgR1azAMG2E0iC5WrBqPtxAQML0Y&_nc_zt=23&_nc_ht=scontent.fjai12-1.fna&_nc_gid=DyVDLVkYf_TAln5O6zKoqQ&oh=00_AfhSGVOrpSsccI_Dx-5aNmxGBAwaRfCzDYDF55H-WEQ19g&oe=690D6D96",
    email: "admin@helphive.com",
    phone: "+91-7050-6029-72",
    address: { line1: "Fatehpur, Gaya", line2: "Bihar - 824232, India" },
    gender: "Male",
    dob: "2000-01-01",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md flex flex-col items-center gap-4 p-8">
        <img
          src={userData.image}
          className="w-24 h-24 object-cover rounded-full ring-2 ring-gray-200"
          alt="Profile"
        />
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
                  <input className="w-full border-b-2 border-blue-300 bg-transparent px-2 py-2 focus:outline-none focus:border-blue-600 text-gray-900 transition" type="text" value={userData.address.line1}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input className="w-full border-b-2 border-blue-300 bg-transparent px-2 py-2 focus:outline-none focus:border-blue-600 text-gray-900 transition" type="text" value={userData.address.line2}
                    onChange={e =>
                      setUserData(prev => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </span> :
                <span className="ml-2">
                  {userData.address.line1}<br />{userData.address.line2}
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
        <button
          className="mt-4 px-6 py-2 rounded-full text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
