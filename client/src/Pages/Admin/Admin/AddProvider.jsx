import React, { useContext, useState } from 'react'
import { assets } from '../../../assets/assets'
import { AdminContext } from '../../../context/AdminContext'
import { toast } from 'react-toastify'

const AddProvider = () => {

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



  const {backendURL, aToken} = useContext(AdminContext)
  
  const onSubmitHandler = (e) => {
    e.preventDefault();

    try {
      if (!provImg){
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', provImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fee', Number(fee))
      formData.append('service', service)
      formData.append('about', about)
      formData.append('address', JSON.stringify({line1 : address1, line2 : address2}))


    } catch (error) {
      
    }
  }

  return (
    <div>
      <form className='m-5 w-full' onSubmit={onSubmitHandler}>
        <p className='mb-3 text-lg font-medium'>Add Provider</p>

        <div className='bg-white px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
          <div className='flex items-center gap-4 mb-8 text-gray-500'>
            <label htmlFor="provImg">
              <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={provImg ? URL.createObjectURL(provImg) : assets.upload_area} />
            </label>
            <input type="file" onChange={(e) => setProvImg(e.target.files[0])} id="provImg" hidden />
            <p>Upload Provider <br /> Picture</p>
          </div>

          <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Provider Name</p>
                <input className='border rounded px-3 py-2' type="text" placeholder='Name' required onChange={(e) => setName(e.target.value)} value={name} />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Provider Email</p>
                <input className='border rounded px-3 py-2' type="email" placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Provider Password</p>
                <input className='border rounded px-3 py-2' type="password" placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Experience</p>
                <select className='border rounded px-3 py-2' onChange={(e) => setExperience(e.target.value)} value={experience}>
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10 Year">10 Year</option>
                </select>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Fee</p>
                <input className='border rounded px-3 py-2' type="number" placeholder='Fee' required onChange={(e) => setFee(e.target.value)} value={fee} />
              </div>

            </div>

            <div className='w-full lg:flex-1 flex flex-col gap-4'>
              <div className='flex-1 flex flex-col gap-1'>
                <p>Service</p>
                <select className='border rounded px-3 py-2' onChange={(e) => setSrvice(e.target.value)} value={service}>
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Tailor">Tailor</option>
                  <option value="Painter">Painter</option>
                  <option value="Carpenter">Carpenter</option>
                  <option value="Beautician">Beautician</option>
                </select>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Address</p>
                <input className='border rounded px-3 py-2' type="text" placeholder='Address line 1' required onChange={(e) => setAddress1(e.target.value)} value={address1} />
                <input className='border rounded px-3 py-2' type="text" placeholder='Address line 2' required onChange={(e) => setAddress2(e.target.value)} value={address2} />
              </div>

            </div>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p className='mt-4 mb-2'>About Provider</p>
            <textarea className='w-full px-4 pt-2 border rounded' placeholder='Write about provider ..' rows='5' onChange={(e) => setAbout(e.target.value)} value={about}></textarea>
          </div>
          <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Provider</button>
        </div>
      </form>
    </div>
  )
}

export default AddProvider