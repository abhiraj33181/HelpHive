import React, { useContext, useState } from 'react'
import { assets } from '../../../assets/assets'
import { AdminContext } from '../../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddProvider = () => {

  const [loading, setLoading] = useState(false)
  const [provImg, setProvImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fee, setFee] = useState('')
  const [service, setSrvice] = useState('Plumber')
  const [about, setAbout] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendURL, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      if (!provImg) {
        return toast.error('Image Not Selected')
      }
      const formData = new FormData()
      formData.append('image', provImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fee))
      formData.append('service', service)
      formData.append('about', about)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(`${backendURL}/api/admin/add-provider`, formData, { withCredentials: true })
      if (data.success) {
        toast.success(data.message)
        setProvImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperience('1 Year')
        setFee('')
        setAddress1('')
        setAddress2('')
        setAbout('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const localServices = ["Plumber", "Electrician", "Carpenter", "Painter", "AC Technician", "Refrigerator Mechanic", "Washing Machine Repair", "TV Repair", "House Cleaning", "Gardener", "Pest Control", "CCTV Technician", "Laptop Repair", "Mobile Repair", "Vehicle Mechanic", "Water Purifier Service", "Gas Stove Repair", "Tile & Marble Worker", "Welder", "Mason (Rajmistri)", "Interior Designer", "Driver", "Cook", "Home Tutor", "Laundry & Dry Cleaning", "Salon & Hairdresser", "Packer and Mover", "Furniture Polishing", "Roofer", "Security Guard", "Painter (Wall Art & Texture)", "Tailor", "Beautician", "Computer Technician", "Water Tank Cleaner", "Solar Panel Technician", "Window Glass Fitter", "Locksmith", "Pest & Termite Control", "House Shifting Helper", "Handyman"];


  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <form onSubmit={onSubmitHandler} className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Add Provider</h2>

        <div className="bg-white shadow-md rounded-lg p-6 overflow-y-auto max-h-[75vh]">
          <div className="flex items-center gap-6 mb-8 text-gray-600">
            <label htmlFor="provImg" className="cursor-pointer">
              <img
                src={provImg ? URL.createObjectURL(provImg) : assets.upload_area}
                alt="Provider"
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
              />
            </label>
            <input
              type="file"
              id="provImg"
              accept="image/*"
              hidden
              onChange={(e) => setProvImg(e.target.files[0])}
            />
            <p className="text-gray-700 text-base">Upload Provider <br /> Picture</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 text-gray-700">
            <div className="flex-1 flex flex-col gap-5">
              <div>
                <label className="block mb-1 font-medium">Provider Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Provider Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Provider Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Experience</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Fee</label>
                <input
                  type="number"
                  placeholder="Fee"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-5">
              <div>
                <label className="block mb-1 font-medium">Service</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={service}
                  onChange={(e) => setSrvice(e.target.value)}
                >
                  {localServices.map((val, index) => <option key={index}>{val}</option>)}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Address</label>
                <input
                  type="text"
                  placeholder="Address line 1"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Address line 2"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2 font-medium text-gray-700">About Provider</label>
            <textarea
              rows={5}
              placeholder="Write about provider .."
              className="w-full border border-gray-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full lg:w-auto font-semibold rounded-full px-12 py-3 transition focus:outline-none focus:ring-4
    ${loading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-dark focus:ring-primary-light'
              }`}
          >
            {loading ? 'Creating...' : 'Add Provider'}
          </button>

        </div>
      </form>
    </div>
  )
}

export default AddProvider
