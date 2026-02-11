<<<<<<< HEAD
import React from 'react';
import { MapPin, Phone, Mail, Briefcase, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className='min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 mt-10'>
      <div className='max-w-7xl mx-auto'>

        {/* --- Header --- */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-900 tracking-tight'>
            Get in <span className='text-blue-600'>Touch</span>
          </h2>
          <p className='text-slate-500 mt-4 text-lg max-w-2xl mx-auto'>
            We'd love to hear from you. Whether you have a question about our services, pricing, or need support, our team is ready to answer all your questions.
          </p>
        </div>

        {/* --- Content Section --- */}
        <div className='flex flex-col lg:flex-row gap-12 items-start'>
          
          {/* Left Side: Image */}
          <div className='w-full lg:w-5/12 relative group'>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-20 blur-lg group-hover:opacity-30 transition duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
              alt="Office" 
              className='relative w-full h-[500px] object-cover rounded-2xl shadow-xl' 
            />
            {/* Floating Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-lg">
                <p className="font-semibold text-slate-900 mb-1">Support Hours</p>
                <p className="text-sm text-slate-600">Mon - Sat: 09:00 AM - 06:00 PM</p>
                <p className="text-sm text-slate-600">Sunday: Closed</p>
            </div>
          </div>

          {/* Right Side: Contact Info */}
          <div className='w-full lg:w-7/12 flex flex-col gap-8'>
            
            {/* Card 1: Office Address */}
            <div className='bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <MapPin className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <h3 className='text-lg font-bold text-slate-900 mb-2'>Our Office</h3>
                  <p className='text-slate-600 leading-relaxed'>
                    Chitragupta Bhawan, Near Bus Stand <br />
                    Fatehpur Gaya - 824232, Bihar, India
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Contact Details */}
            <div className='bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <Phone className='w-6 h-6 text-blue-600' />
                </div>
                <div className='w-full'>
                  <h3 className='text-lg font-bold text-slate-900 mb-4'>Contact Info</h3>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <p className='text-sm text-slate-500 mb-1 font-medium uppercase'>Phone</p>
                      <a href="tel:+917050602972" className='text-slate-800 font-medium hover:text-blue-600 transition-colors'>
                        +91-7050-6029-72
                      </a>
                    </div>
                    <div>
                      <p className='text-sm text-slate-500 mb-1 font-medium uppercase'>Email</p>
                      <a href="mailto:support@helphive.com" className='text-slate-800 font-medium hover:text-blue-600 transition-colors'>
                        support@helphive.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Careers */}
            <div className='bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden group'>
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
              
              <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 border border-white/20'>
                    <Briefcase className='w-6 h-6 text-blue-200' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-white mb-2'>Careers at HelpHive</h3>
                    <p className='text-slate-300 text-sm max-w-xs'>
                      Passionate about helping others? Join our team and help us build the future of local services.
                    </p>
                  </div>
                </div>

                <button className='bg-white text-slate-900 hover:bg-blue-50 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 group-hover:scale-105 whitespace-nowrap'>
                  Explore Jobs <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

=======
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
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default Contact;
=======
export default Contact
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
