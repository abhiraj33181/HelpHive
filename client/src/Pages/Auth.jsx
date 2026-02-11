import React, { useContext, useEffect, useState } from 'react';
import Login from '../components/Auth/Login';
import { useNavigate, useParams } from 'react-router-dom';
import { ProviderContext } from '../context/ProviderContext';
import { AppContext } from '../context/AppContext';
import { HandHelpingIcon, ShieldCheck } from 'lucide-react';

function Auth() {
  const { pToken } = useContext(ProviderContext);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const { authType } = useParams();
  const [para, setPara] = useState('');

  // Redirect logic based on auth state
  useEffect(() => {
    if (pToken && !token) {
      navigate("/provider/dashboard");
    } else if (token && !pToken) {
      navigate("/dashboard");
    }
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