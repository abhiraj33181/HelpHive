import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ProviderContext } from '../../context/ProviderContext';
import { toast } from 'react-toastify';

const Login = ({ type = "login" }) => {
  const { backendURL, token, axios, navigate, loadUserProfileData } = useContext(AppContext);
  const { getProfileData } = useContext(ProviderContext);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('User'); // Default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isSignUp = type === 'signup';
  
  // Dynamic Text
  const title = isSignUp ? 'Create Account' : 'Welcome Back';
  const subtitle = isSignUp ? 'Start your journey with us today.' : 'Please enter your details to sign in.';
  const buttonText = isSignUp ? 'Sign Up' : 'Sign In';
  const altTextLink = isSignUp ? 'Already have an account?' : "Don't have an account?";
  const altLinkAction = isSignUp ? 'Sign In' : 'Create Account';
  const altLink = isSignUp ? '/auth/login' : '/auth/signup';

  useEffect(() => {
    if (token) navigate('/dashboard');
    setError(''); // Clear errors on type switch
  }, [token, navigate, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, email, password } = formData;
    const isProvider = role === 'Provider';

    try {
      let endpoint = '';
      let payload = { email, password };

      if (isSignUp) {
        endpoint = isProvider ? '/api/provider/register' : '/api/user/register';
        payload = { ...payload, name };
      } else {
        endpoint = isProvider ? '/api/provider/login' : '/api/user/login';
      }

      const { data } = isProvider && !isSignUp 
        ? await axios.post(`${backendURL}${endpoint}`, payload, { withCredentials: true }) // Provider Login usually needs cookies/credentials
        : await axios.post(`${backendURL}${endpoint}`, payload); // Standard login

      if (data.success) {
        toast.success(data.message || "Authentication successful!");
        
        if (isProvider) {
          await getProfileData();
          navigate('/provider/dashboard');
        } else {
          await loadUserProfileData();
          navigate('/dashboard');
        }
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    toast.info("Google Authentication coming soon!");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-2">{subtitle}</p>
      </div>

      {/* Role Switcher (Tabs) */}
      <div className="bg-slate-100 p-1.5 rounded-xl flex items-center mb-8">
        <button
          type="button"
          onClick={() => setRole('User')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            role === 'User' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          User
        </button>
        <button
          type="button"
          onClick={() => setRole('Provider')}
          className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
            role === 'Provider' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Helper / Provider
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></div>
          <p className="text-sm text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {isSignUp && (
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-12 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Please wait...' : buttonText}
            {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-8">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase tracking-wider font-medium">Or continue with</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="w-full bg-white border border-slate-200 text-slate-700 font-medium rounded-xl py-3 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all active:scale-[0.98]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Google
      </button>

      {/* Footer Link */}
      <div className="mt-8 text-center text-sm">
        <p className="text-slate-500">
          {altTextLink}{' '}
          <Link to={altLink} className="text-blue-600 font-bold hover:text-blue-700 hover:underline">
            {altLinkAction}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;