const Contact = () => {
  return (
    <div className='mx-4 sm:mx-[10%] py-10 px-4'>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img src="https://media.assettype.com/analyticsinsight%2Fimport%2Fwp-content%2Fuploads%2F2023%2F08%2FThe-Power-of-Local-Advantages-of-Choosing-a-London-based-IT-Support-Provider.jpg?w=480&auto=format%2Ccompress&fit=max" className='w-full md:max-w-[360px]' />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our Office</p>
          <p className='text-gray-500'>Chitragupta Bhawan, Near Bus Stand <br />Fatehpur Gaya - 824232, Bihar, India</p>
          <p className='text-gray-500'>Tel : +91-7050-6029-72 <br />Email : support@helphive.com</p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT HELPHIVE</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact