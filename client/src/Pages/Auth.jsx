<<<<<<< HEAD
import React, { useContext, useEffect, useState } from 'react';
import Login from '../components/Auth/Login';
import { useNavigate, useParams } from 'react-router-dom';
import { ProviderContext } from '../context/ProviderContext';
import { AppContext } from '../context/AppContext';
import { HandHelpingIcon, ShieldCheck } from 'lucide-react';
=======
import React, { useContext, useEffect, useState } from 'react'
import Login from '../components/Auth/Login'
import { useNavigate, useParams } from 'react-router-dom'
import { ProviderContext } from '../context/ProviderContext'
import { AppContext } from '../context/AppContext'
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e

function Auth() {
  const { pToken } = useContext(ProviderContext);
  const { token } = useContext(AppContext);
<<<<<<< HEAD
  const navigate = useNavigate();
  const { authType } = useParams();
  const [para, setPara] = useState('');

  // Redirect logic based on auth state
=======

  const navigate = useNavigate()
  const { authType } = useParams()

  useEffect(() => {
    if (authType !== 'login' && authType !== 'signup') {
      navigate('/')
    } else {
      if (authType === 'login') {
        setPara('Continue discovering and connecting with trusted local helpers, shop owners, and landlords — all in one place.')
      } else {
        setPara('Find verified local helpers, shop owners, and landlords — all in one place. HelpHive makes it easy to discover, connect, and book trusted services quickly and safely, anytime and anywhere.')
      }
    }
  }, [authType, navigate])

  const [para, setPara] = useState('')

>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
  useEffect(() => {
    if (pToken && !token) {
      navigate("/provider/dashboard");
    } else if (token && !pToken) {
      navigate("/dashboard");
    }
<<<<<<< HEAD
  }, [token, pToken, navigate]);

  // Set text based on route
  useEffect(() => {
    if (authType !== 'login' && authType !== 'signup') {
      navigate('/');
    } else {
      if (authType === 'login') {
        setPara('Welcome back! Continue connecting with trusted local helpers and managing your services with ease.');
      } else {
        setPara('Join HelpHive today. Discover, connect, and book trusted services quickly and safely, anytime and anywhere.');
      }
    }
  }, [authType, navigate]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      
      {/* Left Side - Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 xl:p-20 overflow-y-auto">
        <Login type={authType} />
      </div>

      {/* Right Side - Visual Area */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900">
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1581578731117-104f8a338e2d?q=80&w=2070&auto=format&fit=crop" 
                alt="Background" 
                className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-indigo-900/90 mix-blend-multiply"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center p-12 text-white">
          
          <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 shadow-2xl ring-1 ring-white/20">
            <HandHelpingIcon className="w-10 h-10 text-blue-200" />
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold mb-6 tracking-tight leading-tight">
            Simplify your life with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">HelpHive</span>
          </h2>

          <p className="text-lg text-blue-100/80 max-w-lg leading-relaxed mb-8">
            {para}
          </p>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 text-sm font-medium text-blue-200 bg-blue-950/30 px-6 py-3 rounded-full backdrop-blur-sm border border-blue-500/20">
            <ShieldCheck className="w-5 h-5" />
            <span>100% Verified Providers</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Auth;
=======
  }, [token, pToken]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-white">
        <Login type={authType} />
      </div>

      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent z-10"></div>

        <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center relative">
          <div
            className='absolute inset-0 bg-[url("https://png.pngtree.com/thumb_back/fh260/background/20241224/pngtree-a-fully-equipped-gym-with-dumbbells-weight-machines-and-cardio-equipment-image_16843660.jpg")] bg-cover bg-center opacity-20'
          ></div>

          <div className="text-center text-white p-10 max-w-lg z-20">
            <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            <h2 className="heading text-4xl font-extrabold mb-4 tracking-tight">
              Welcome to <span className="text-blue-200 heading">HelpHive</span>
            </h2>

            <p className="text-lg text-blue-100 mb-3 font-medium">
              Your trusted local connection.
            </p>

            <p className="text-md text-blue-100/80 leading-relaxed">
              {para}
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
