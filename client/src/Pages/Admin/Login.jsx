import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ProviderContext } from '../../context/ProviderContext'

function Login() {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAToken, backendURL} = useContext(AdminContext)
    const {pToken, setPToken} = useContext(ProviderContext)


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === 'Admin') {
                const {data} = await axios.post(`${backendURL}/api/admin/login`, {email, password}, { withCredentials: true })
                if (data.success){
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    console.log(data.token)
                }else{
                    toast.error(data.message)
                }
            }else{
                const {data} = await axios.post(`${backendURL}/api/provider/login`, {email, password})
                if (data.success){
                    localStorage.setItem('pToken', data.token)
                    setPToken(data.token)
                    toast.success("Access Granted")
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    
    return (
        <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-[#fafbfc]">
            <div className="mx-2 w-full max-w-sm flex flex-col gap-5 px-6 py-8 border border-[#e7eaf3] rounded-2xl shadow-md bg-white">
                <h2 className="text-xl font-semibold text-center text-gray-700 tracking-tight">
                    <span className="text-[#5F6FFF]">{state}</span> Login
                </h2>
                <div className="w-full">
                    <label className="block text-gray-600 pb-1" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="w-full border border-[#d1d5db] bg-[#f6f8fa] rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-[#5F6FFF] transition"
                    />
                </div>
                <div className="w-full">
                    <label className="block text-gray-600 pb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="w-full border border-[#d1d5db] bg-[#f6f8fa] rounded-lg py-2 px-3 outline-none focus:ring-2 focus:ring-[#5F6FFF] transition"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 rounded-lg bg-[#5F6FFF] hover:bg-[#4d59ce] transition font-medium text-white text-base mt-1 shadow-sm"
                >
                    Login
                </button>
                <div className="text-center text-sm text-gray-500 mt-2 select-none">
                    {state === 'Admin' ? (
                        <>
                            Provider Login?{' '}
                            <button
                                type="button"
                                className="text-[#5F6FFF] underline font-semibold hover:text-blue-900 ml-1"
                                onClick={() => setState('Provider')}
                            >
                                Click here
                            </button>
                        </>
                    ) : (
                        <>
                            Admin Login?{' '}
                            <button
                                type="button"
                                className="text-[#5F6FFF] underline font-semibold hover:text-blue-900 ml-1"
                                onClick={() => setState('Admin')}
                            >
                                Click here
                            </button>
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}

export default Login
