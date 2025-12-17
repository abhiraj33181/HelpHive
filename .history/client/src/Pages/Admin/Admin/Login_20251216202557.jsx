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
    e.preventDefault()

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
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl shadow-slate-900/60">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr,1fr]">
          {/* Left side: form */}
          <div className="px-7 py-10 sm:px-10 sm:py-12 flex items-center">
            <form
              onSubmit={onSubmitHandler}
              className="w-full max-w-sm mx-auto flex flex-col gap-6"
            >
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Admin Panel
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                  Sign in to continue
                </h2>
                <p className="text-xs text-slate-400">
                  Use your admin credentials to access the dashboard.
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-full">
                  <label
                    className="block text-xs font-medium text-slate-300 mb-1.5"
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
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2.5 px-3.5 text-sm text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:bg-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>

                <div className="w-full">
                  <label
                    className="block text-xs font-medium text-slate-300 mb-1.5"
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
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/60 py-2.5 px-3.5 text-sm text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:bg-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center justify-center rounded-xl bg-indigo-500 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/40 transition-all hover:bg-indigo-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Login
              </button>
            </form>
          </div>

          {/* Right side: accent panel */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-500/10 via-indigo-400/10 to-cyan-500/10 border-l border-slate-800">
            <div className="px-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-3 py-1 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-medium text-slate-200">
                  Secure admin access
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-50 mb-2">
                Minimal, focused, fast.
              </h3>
              <p className="text-xs text-slate-400 max-w-xs">
                A distraction-free sign-in screen so you can get back to managing your
                school operations in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
