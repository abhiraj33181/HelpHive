import React from 'react'

export const UserOnboarding = () => {

  const inputCSS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-400 outline-none transition duration-200"

  const selectCSS = "border border-slate-300 rounded-lg px-3 py-2 w-full text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-blue-400 outline-none bg-white transition duration-200"

  const subCategory = ["Plumber", "Electrician", "AC Technician", "Carpenter", "Painter", "Mason", "Roofer", "Welder", "Glass Fitter", "Tiles Worker"];

  return (
    <div className='h-screen w-full flex  justify-center items-center flex-col bg-zinc-200 gap-4'>
      <div className=''>
        <div className='flex items-center gap-3 bg-white py-6 px-10 rounded-t-2xl'>
          <h1 className='bg-blue-900 text-white text-5xl rounded-full w-20 h-20 flex items-center justify-center'>A</h1>

          <div>
            <h1 className='font-bold text-3xl'>Welcome, Abhishek Raj</h1>
            <p className='text-gray-500 text-md'>Complete your registration process!</p>
          </div>

        </div>
        {/* step part  */}

        <div className='h-20 bg-white my-5 flex flex-col justify-center'>
          <div className='px-10'>
            <hr className='border-0 bg-gray-300 h-1 w-full' />
            <div className='flex justify-between mt-[-20px]'>
              <h1 className='bg-blue-500 h-10 w-10 font-semibold text-xl rounded-full flex items-center justify-center text-white'>1</h1>
              <h1 className='bg-zinc-500 h-10 w-10 font-semibold text-xl rounded-full flex items-center justify-center text-white'>2</h1>
              <h1 className='bg-zinc-500 h-10 w-10 font-semibold text-xl rounded-full flex items-center justify-center text-white'>3</h1>
            </div>
          </div>
        </div>


        {/* bottom part  */}
        <div className='bg-white rounded-b-2xl mt-2 p-5'>
          <h1 className='font-semibold text-xl'>Professional Information</h1>

          <div className='flex mt-4 justify-between'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="specialization" className='font-semibold'>Specilization <span className='text-red-800'>*</span></label>
              <select id='specialization' className={selectCSS}>
                <option>Electrician</option>
                <option>Plumber</option>
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="experience" className='font-semibold'>Experience <span className='text-red-800'>*</span></label>
              <input type="number" id='experience' className={inputCSS} placeholder='eg. 6' />
            </div>
          </div>

          <div className='mt-4'>
            <label htmlFor="category" className='font-semibold'>Service Category <span className='text-red-800'>*</span></label>
            <p className='text-zinc-600'>Select the service you provide services for (select at least one):</p>

            <div className='grid grid-cols-2 sm:grid-cols-3 gap-0 mb-4'>
              {subCategory.map((item, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <input type="checkbox" value={item} id={item} className='w-3 h-3 accent-blue-600 cursor-pointer' />
                  <label htmlFor={item} className='cursor-pointer hover:text-blue-600 text-gray-700'>{item}</label>
                </div>
              ))}
            </div>


            <div className='flex flex-col gap-1'>
              <label htmlFor="about" className='font-semibold'>About You <span className='text-red-800'>*</span></label>
              <textarea className={inputCSS} rows='3' placeholder='Tell User about your expertise and approach to service' id="about"></textarea>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="about" className='font-semibold'>Appointment Fees (₹) <span className='text-red-800'>*</span></label>
              <input type="number" id='experience' className={inputCSS} placeholder='eg. 500' />
            </div>


            <div className='flex justify-between mt-5'>
              <button className='cursor-pointer hover:bg-blue-800 w-fit bg-blue-600 text-white py-1 px-3 rounded'>Previous</button>
              <button className='cursor-pointer hover:bg-slate-900 w-fit bg-slate-800 text-white py-1 px-3 rounded'>Next</button>
            </div>



          </div>

        </div>
      </div>
    </div>
  )
}
