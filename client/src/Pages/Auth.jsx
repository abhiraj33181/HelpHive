import React, { useContext, useEffect, useState } from 'react'
import Login from '../components/Auth/Login'
import { useNavigate, useParams } from 'react-router-dom'
import { ProviderContext } from '../context/ProviderContext'
import { AppContext } from '../context/AppContext'

function Auth() {
  const { pToken } = useContext(ProviderContext);
  const { token } = useContext(AppContext);

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

  useEffect(() => {
    if (pToken && !token) {
      navigate("/provider/dashboard");
    } else if (token && !pToken) {
      navigate("/dashboard");
    }
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
