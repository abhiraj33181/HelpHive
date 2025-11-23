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
import ProviderLogin from './Pages/Provider/ProviderLogin'
import ProtectedRoutes from './components/ProtectedRoutes'
import UserDashboard from './Pages/User/UserDashboard'
import MyAppointment from './Pages/User/MyAppointment'

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

        <Route path='/dashboard' element={<UserDashboard />}>
          <Route index element={<MyAppointment />} />
          <Route path='my-profile' element={<MyProfile />} />
        </Route>

        <Route path='/provider' element={pToken ? <Navigate to='/provider/dashboard' /> : <ProviderLogin />} />
        <Route path='/provider/dashboard' element={<ProviderLayout />}>
          <Route index element={<ProviderDashboard />} />
          <Route path='my-profile' element={<ProviderProfile />} />
          <Route path='all-appointments' element={<ProviderAppointments />} />
        </Route>

        <Route path='/admin/onboarding/user' element={<UserOnboarding />} />

        <Route path='/admin'>
          <Route index element={aToken ? <Navigate to='/admin/dashboard' /> : <Login />} />
          <Route element={<ProtectedRoutes role='admin'><AdminDashboard /></ProtectedRoutes>}>
            <Route path='dashboard' element={<ProtectedRoutes role='admin'><Dashboard /></ProtectedRoutes>} />
            <Route path='all-appointments' element={<ProtectedRoutes role='admin'><AllAppointments /></ProtectedRoutes>} />
            <Route path='add-provider' element={<ProtectedRoutes role='admin'><AddProvider /></ProtectedRoutes>} />
            <Route path='provider-list' element={<ProtectedRoutes role='admin'><ProviderList /></ProtectedRoutes>} />
          </Route>
        </Route>

        {/* <Route path='/provider'>
          <Route element={<ProtectedRoutes role='provider'><ProviderLayout /></ProtectedRoutes>}>
          <Route path='dashboard' element={<ProtectedRoutes role='provider'><ProviderDashboard /></ProtectedRoutes>} />
          </Route>
        </Route> */}
      </Routes>

      {!hideLayout && <Footer />}
    </>
  )
}

export default App