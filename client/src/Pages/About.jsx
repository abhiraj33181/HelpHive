const About = () => {
  return (
    <div className='mx-4 sm:mx-[10%] py-10 px-4'>

      <div className='text-center text-2xl py-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img src='https://assets.enterprisenetworkingplanet.com/uploads/2023/08/enp08252023-enterprise-lan-providers.png?w=1024' className='w-full md:max-w-[360px]' />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to HelpHive, your trusted partner in connecting with local service providers, shop owners, and landlords — all in one place. At HelpHive, we understand how difficult it can be to find reliable and verified helpers nearby. That’s why we’ve built a platform that brings trust, convenience, and transparency to local services.</p>
          <p>HelpHive is committed to simplifying your everyday needs. Whether you’re looking for a plumber, electrician, tutor, shop owner, or rental property, our goal is to make your search effortless and your experience smooth. With verified providers, real-time chat, and secure bookings, HelpHive ensures you connect only with trusted professionals around you.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>At HelpHive, our vision is to empower communities by building a bridge between local service providers and people in need of help. We aim to create a digital ecosystem where reliability meets convenience — making local services accessible, trustworthy, and efficient for everyone.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US?</span></p>
      </div>

      <div className='flex flex-col md:flex-row  mb-20 gap-5'>
        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About