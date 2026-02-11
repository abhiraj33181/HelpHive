import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Users, Zap, Target } from 'lucide-react';

const About = () => {
  return (
    <div className='min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 mt-16'>
      <div className='max-w-7xl mx-auto'>

        {/* --- Header Section --- */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-900 tracking-tight'>
            About <span className='text-blue-600'>Us</span>
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- Mission Section --- */}
        <div className='flex flex-col lg:flex-row items-center gap-12 mb-24'>
          
          {/* Image Side */}
          <div className='w-full lg:w-1/2 relative group'>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition duration-500"></div>
            <img 
              src='https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop' 
              alt="Team collaboration" 
              className='relative rounded-2xl shadow-xl w-full object-cover h-[400px]' 
            />
          </div>

          {/* Text Side */}
          <div className='w-full lg:w-1/2 flex flex-col gap-6'>
            <h3 className="text-2xl font-bold text-slate-900">
              Building Bridges in Your Community
            </h3>
            
            <p className='text-slate-600 leading-relaxed text-lg'>
              Welcome to <span className="font-semibold text-blue-600">HelpHive</span>, your trusted partner in connecting with local service providers, shop owners, and landlords — all in one place. We understand how difficult it can be to find reliable helpers nearby. That’s why we’ve built a platform that brings trust, convenience, and transparency to local services.
            </p>
            
            <p className='text-slate-600 leading-relaxed text-lg'>
              Whether you’re looking for a plumber, electrician, tutor, or rental property, our goal is to make your search effortless. With verified providers and secure bookings, HelpHive ensures you connect only with trusted professionals.
            </p>

            {/* Vision Box */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-700" />
                <b className='text-slate-900 text-lg'>Our Vision</b>
              </div>
              <p className="text-slate-700 italic">
                "To empower communities by creating a digital ecosystem where reliability meets convenience — making local services accessible, trustworthy, and efficient for everyone."
              </p>
            </div>
          </div>
        </div>

        {/* --- Why Choose Us Section --- */}
        <div className='mb-16'>
          <h3 className='text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center'>
            Why Choose <span className='text-blue-600'>HelpHive?</span>
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            
            {/* Card 1 */}
            <div className='group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Zap className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Efficiency</h4>
              <p className="text-slate-500 leading-relaxed">
                Streamlined appointment scheduling that fits into your busy lifestyle. Find help in minutes, not days.
              </p>
            </div>

            {/* Card 2 */}
            <div className='group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <ShieldCheck className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Trusted Network</h4>
              <p className="text-slate-500 leading-relaxed">
                Access to a network of 100% verified professionals. Your safety and satisfaction are our top priority.
              </p>
            </div>

            {/* Card 3 */}
            <div className='group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Users className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Community First</h4>
              <p className="text-slate-500 leading-relaxed">
                Tailored recommendations that support local businesses and help your neighborhood thrive.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default About;