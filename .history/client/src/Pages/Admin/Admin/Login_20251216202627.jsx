import React, { useContext, useState } from 'react'
import { AdminContext } from '../../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ProviderContext } from '../../../context/ProviderContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendURL, getProfileData } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendURL}/api/admin/login`,
        { email, password },
        { withCredentials: true }
      )
      if (data.success) {
        localStorage.setItem('aToken', data.token)
        setAToken(data.token)
        console.log(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm rounded-3xl bg-white/80 shadow-lg shadow-slate-200/70 border border-slate-100 backdrop-blur-sm px-7 py-8 sm:px-8 sm:py-9 flex flex-col gap-6"
      >
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
            Admin <span className="text-indigo-500">Login</span>
          </h2>
          <p className="text-xs text-slate-500">
            Sign in to manage your dashboard.
          </p>
        </div>

        <div className="space-y-4">
          <div className="w-full">
            <label
              className="block text-xs font-medium text-slate-600 mb-1.5"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="w-full">
            <label
              className="block text-xs font-medium text-slate-600 mb-1.5"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 px-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-indigo-500 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
