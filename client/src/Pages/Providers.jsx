import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Providers = () => {
  const navigate = useNavigate()
  const { service } = useParams()
  const [showFilter, setShowFilter] = useState(false)

  const { providers } = useContext(AppContext)

  const [filterProv, setFilterProv] = useState([])

  const applyFilter = () => {
    if (service) {
      setFilterProv(providers.filter(prov => prov.service === service))
    } else {
      setFilterProv(providers)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [providers, service])

  return (
    <div className='mx-4 sm:mx-[10%] py-20'>
      <p className='text-gray-600 '>Browse through the providers specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={() => setShowFilter(prev => !prev)} className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 transition-all duration-300 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => service === 'Electrician' ? navigate('/providers') : navigate('/providers/Electrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "Electrician" ? "bg-indigo-100 text-black" : ""}`}>Electrician</p>
          <p onClick={() => service === 'Home Tutor' ? navigate('/providers') : navigate('/providers/Home Tutor')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "Home Tutor" ? "bg-indigo-100 text-black" : ""}`}>Home Tutor</p>
          <p onClick={() => service === 'Plumber' ? navigate('/providers') : navigate('/providers/Plumber')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "Plumber" ? "bg-indigo-100 text-black" : ""}`}>Plumber</p>
          <p onClick={() => service === 'Tailor' ? navigate('/providers') : navigate('/providers/Tailor')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "Tailor" ? "bg-indigo-100 text-black" : ""}`}>Tailor</p>
          <p onClick={() => service === 'Painter' ? navigate('/providers') : navigate('/providers/Painter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "Painter" ? "bg-indigo-100 text-black" : ""}`}>Painter</p>
          <p onClick={() => service === 'Carpenter' ? navigate('/providers') : navigate('/providers/Carpenter')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "Carpenter" ? "bg-indigo-100 text-black" : ""}`}>Carpenter</p>
          <p onClick={() => service === 'Beautician' ? navigate('/providers') : navigate('/providers/Beautician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${service === "Beautician" ? "bg-indigo-100 text-black" : ""}`}>Beautician</p>
        </div>

        <div className='w-full grid [grid-template-columns:var(--grid-cols-auto)]  gap-4 gap-y-6'>
          {filterProv.map((provider, index) => (
            <div onClick={() => navigate(`/appointment/${provider._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img src={provider.image} className='bg-blue-50 w-full object-cover' />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className={`w-2 h-2 ${provider.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                  <p className={`${provider.available ? 'text-green-500' : 'text-red-500'}`}>
                    {provider.available ? 'Available' : 'Not Available'}
                  </p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{provider.name}</p>
                <p className='text-gray-600 text-sm'>{provider.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Providers