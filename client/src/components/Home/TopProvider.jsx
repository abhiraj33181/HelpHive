<<<<<<< HEAD
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const TopProvider = () => {
    const navigate = useNavigate();
    const { providers } = useContext(AppContext);

    return (
        <section className='py-16 px-4 md:px-10 bg-slate-50'>
            <div className='container mx-auto flex flex-col items-center gap-4 mb-10'>
                <h1 className='text-3xl md:text-4xl font-bold text-slate-800 text-center'>
                    Top Rated Helpers
                </h1>
                <p className='sm:w-1/2 text-center text-slate-500 text-lg'>
                    Browse our list of highly rated local professionals ready to assist you.
                </p>
            </div>

            {/* Grid Container */}
            <div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {providers.slice(0, 10).map((provider, index) => (
                    <div 
                        key={index}
                        onClick={() => { navigate(`/appointment/${provider._id}`); window.scrollTo(0, 0); }}
                        className='group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col'
                    >
                        {/* Image Container with Overlay Badge */}
                        <div className='relative h-56 overflow-hidden bg-slate-100'>
                            <img 
                                src={provider.image} 
                                alt={provider.name} 
                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
                            />
                            
                            {/* Status Badge */}
                            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md ${
                                provider.available 
                                    ? 'bg-green-500/90 text-white' 
                                    : 'bg-red-500/90 text-white'
                            }`}>
                                {provider.available ? 'Available' : 'Busy'}
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className='p-5 flex flex-col flex-1'>
                            {/* Category & Rating */}
                            <div className='flex justify-between items-start mb-2'>
                                <span className='px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md uppercase tracking-wider'>
                                    {provider.service || "Helper"}
                                </span>
                                <div className='flex items-center gap-1 text-amber-400'>
                                    <Star className='w-3 h-3 fill-current' />
                                    <span className='text-xs font-medium text-slate-600'>4.8</span>
                                </div>
                            </div>

                            <h3 className='text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1'>
                                {provider.name}
                            </h3>
                            
                            {/* Mock Location - You can replace with provider.address if available */}
                            <div className='flex items-center gap-1 text-slate-500 text-sm mb-4'>
                                <MapPin className='w-3.5 h-3.5' />
                                <span className='truncate'>Local Provider</span>
                            </div>

                            {/* Status Text (Footer of card) */}
                            <div className='mt-auto pt-4 border-t border-slate-100 flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className={`flex w-2 h-2 rounded-full ${provider.available ? 'bg-green-500' : 'bg-red-400'}`}></span>
                                    <span className={`text-xs font-medium ${provider.available ? 'text-green-600' : 'text-red-500'}`}>
                                        {provider.available ? 'Accepting Bookings' : 'Currently Unavailable'}
                                    </span>
                                </div>
                            </div>
=======
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const TopProvider = () => {
    const navigate = useNavigate()
    const {providers} = useContext(AppContext)
    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-bold'>Top Provider to Book</h1>
            <p className='sm:w-1/3 text-center text-md'>Simply browse through our extensive list of trusted doctors</p>

            <div className='w-full grid [grid-template-columns:var(--grid-cols-auto)] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {providers.slice(0, 10).map((provider, index) => (
                    <div onClick={() => {navigate(`/appointment/${provider._id}`); scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img src={provider.image} className='bg-blue-50' />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className={`w-2 h-2 ${provider.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></p>
                                <p className={`${provider.available ? 'text-green-500' : 'text-red-500'}`}>
                                    {provider.available ? 'Available' : 'Not Available'}
                                </p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{provider.name}</p>
                            <p className='text-gray-600 text-sm'>{provider.service}</p>
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
                        </div>
                    </div>
                ))}
            </div>
<<<<<<< HEAD

            {/* View More Button */}
            <div className='mt-12 text-center'>
                <button 
                    onClick={() => { navigate('/providers'); window.scrollTo(0, 0); }}
                    className='inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-8 py-3 rounded-full font-medium hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all duration-300 shadow-sm'
                >
                    View All Providers <ArrowRight className='w-4 h-4' />
                </button>
            </div>
        </section>
    );
};

export default TopProvider;
=======
            <button className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 cursor-pointer' onClick={() => {navigate('/providers'); scrollTo(0,0)}}>More</button>
        </div>
    )
}

export default TopProvider
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
