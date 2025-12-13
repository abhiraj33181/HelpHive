import Navbar from '../../components/Admin/Navbar'
import Sidebar from '../../components/Admin/Sidebar'
import { Outlet } from 'react-router-dom'

function adminDashboard() {
  return (
    <>
      <div className='bg-[#F8F9FD]'>
        <Navbar />

        <div className='flex items-start'>
          <Sidebar />
            <Outlet/>
        </div>
      </div>
    </>
  )
}

export default adminDashboard