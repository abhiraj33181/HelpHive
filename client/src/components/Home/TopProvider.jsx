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
                        </div>
                    </div>
                ))}
            </div>
            <button className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 cursor-pointer' onClick={() => {navigate('/providers'); scrollTo(0,0)}}>More</button>
        </div>
    )
}

export default TopProvider