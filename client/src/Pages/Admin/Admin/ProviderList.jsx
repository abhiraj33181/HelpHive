import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../../context/AdminContext'
import { useEffect } from 'react'

function ProviderList() {
  const {providers, aToken, getAllProviders, changeAvailablity} = useContext(AdminContext)

  useEffect(() => {
    if(aToken){
      getAllProviders()
    }
  }, [aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Providers</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          providers.map((item, index) => (
            <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
              <img src={item.image} className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.service}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input type="checkbox" checked={item.available} onChange={() => changeAvailablity(item._id)}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProviderList