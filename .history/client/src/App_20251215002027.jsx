import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Admin/Admin/Dashboard'
import Providers from './Pages/Providers'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyProfile from './Pages/User/MyProfile'
import Appointment from './Pages/Appointment'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollTop'
import Login from './Pages/Admin/Admin/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AllAppointments from './Pages/Admin/Admin/AllAppointments'
import AddProvider from './Pages/Admin/Admin/AddProvider'
import ProviderList from './Pages/Admin/Admin/ProviderList'
import { ProviderContext } from './context/ProviderContext'
import ProviderDashboard from './Pages/Provider/ProviderDashboard'
import ProviderLayout from './Pages/Provider/ProviderLayout'
import ProviderAppointments from './Pages/Provider/ProviderAppointments'
import ProviderProfile from './Pages/Provider/ProviderProfile'
import { UserOnboarding } from './Pages/UserOnboarding'
import UserDashboard from './Pages/User/UserDashboard'
import MyAppointment from './Pages/User/MyAppointment'
import ProtectedRoute from './components/ProtectedRoutes'
import Chat from './Pages/Provider/Chat'
import UserChat from './Pages/User/UserChat'
import MyShop from './Pages/Provider/MyShop'
import NearbyShops from './Pages/NearbyShops.jsx'
import UpdateShop from './Pages/Provider/UpdateShop.jsx'
import AddShop from './Pages/Provider/AddShop.jsx'
import AddProperty from './Pages/Provider/property/AddProperty.jsx'
import MyProperties from './Pages/Provider/property/MyProperties.jsx'
import UpdateProperty from './Pages/Provider/property/UpdateProperty.jsx'
import NearbyProperties from './Pages/NearbyProperties.jsx'
import HelpHiveAssistant from './components/HelpHiveAssistant.jsx.jsx'

const App = () => {

  const location = useLocation()

  const { aToken } = useContext(AdminContext)
  const { pToken } = useContext(ProviderContext)

  const noHeaderFooterRoutes = ['/auth/login', '/auth/signup']
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isProviderRoute = location.pathname === '/provider' || location.pathname.startsWith('/provider/');
  const isUserRoute = location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/');


  const hideLayout = noHeaderFooterRoutes.includes(location.pathname) || isAdminRoute || isProviderRoute || isUserRoute;
  return (
    // mx-4 sm:mx-[10%]
    <>
    <HelpHiveAssistant/>
      <div className='bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen max-w-full'>
      <ScrollToTop />

      {!hideLayout && <Header />}
      <ToastContainer />

        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/providers' element={<Providers />} />
        <Route path='/providers/:service' element={<Providers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:provId' element={<Appointment />} />
        <Route path='/auth/:authType' element={<Auth />} />
        <Route path='/shops' element={<NearbyShops />} />
        <Route path='/property' element={<NearbyProperties />} />
        <Route path='/ai' element={<HelpHiveAssistant />} />

        <Route path='/dashboard' element={<UserDashboard />}>
          <Route index element={<MyAppointment />} />
          <Route path='my-profile' element={<MyProfile />} />
          <Route path='chat/:provId' element={<UserChat />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/provider/dashboard' element={<ProviderLayout />}>
            <Route index element={<ProviderDashboard />} />
            <Route path='my-profile' element={<ProviderProfile />} />
            <Route path='chat/:userId' element={<Chat />} />
            <Route path='all-appointments' element={<ProviderAppointments />} />
            <Route path='my-shop' element={<MyShop />} />
            <Route path='add-shop' element={<AddShop />} />
            <Route path='update-shop/:shopId' element={<UpdateShop />} />

            <Route path='add-property' element={<AddProperty />} />
            <Route path='my-property' element={<MyProperties />} />
            <Route path='update-property/:propertyId' element={<UpdateProperty />} />
          </Route>
        </Route>

        <Route path='/admin/onboarding/user' element={<UserOnboarding />} />

        <Route path='/admin'>
          <Route index element={aToken ? <Navigate to='/admin/dashboard' /> : <Login />} />
          <Route element={<AdminDashboard />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='all-appointments' element={<AllAppointments />} />
            <Route path='add-provider' element={<AddProvider />} />
            <Route path='provider-list' element={<ProviderList />} />
          </Route>
        </Route>

      </Routes>

      {!hideLayout && <Footer />}
      </div>
    </>
  )
}

export default App