import { Calendar, HandHelpingIcon, HousePlugIcon, Stethoscope } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    const user = {
        type : 'user',
        name : 'Abhishek Raj',
        profileImage : '/',
        email : 'support@helphive.com'
    }
    const isAuthenticated = true;
  return (
    <header className="border-b bg-white/95 backdrop:blur-sm fixed top-0 left-0 right-0 z-50">
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
            
            <div className='flex items-center space-x-8'>
                <Link to='/' className='flex items-center space-x-2'>
                    <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                        <HandHelpingIcon className='w-5 h-5 text-white'/>
                    </div>
                    <div className='text-2xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent'>
                        HelpHive
                    </div>
                </Link>

                {isAuthenticated && (
                    <nav className='hidden md:flex items-center space-x-6'>
                        <Link to='/appoitments' className={`flex items-center space-x-1 transition-colorstext-gray-600 hover:text-blue-600`}>
                            <Calendar className='w-4 h-4' />
                            <span className='text-sm font-medium'>Appointments</span>
                        </Link>
                    </nav>
                )}
            </div>
        </div>
    </header>
  )
}

export default Header