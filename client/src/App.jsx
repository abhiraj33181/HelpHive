import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Admin/Admin/Dashboard'
import Providers from './Pages/Providers'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyAppointments from './Pages/MyAppointments'
import MyProfile from './Pages/MyProfile'
import Appointment from './Pages/Appointment'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollTop'
import Login from './Pages/Admin/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AllAppointments from './Pages/Admin/Admin/AllAppointments'
import AddProvider from './Pages/Admin/Admin/AddProvider'
import ProviderList from './Pages/Admin/Admin/ProviderList'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {

  const location = useLocation()
  
  const { aToken } = useContext(AdminContext)
  
  const noHeaderFooterRoutes = ['/auth/login', '/auth/signup']
  const isAdminRoute = location.pathname.startsWith('/admin')

  const hideLayout = noHeaderFooterRoutes.includes(location.pathname) || isAdminRoute;
  return (
    // mx-4 sm:mx-[10%]
    <>
      <ScrollToTop />

      {!hideLayout && <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/providers' element={<Providers />} />
        <Route path='/providers/:service' element={<Providers />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-appointment' element={<MyAppointments />} />
        <Route path='/appointment/:provId' element={<Appointment />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/auth/:authType' element={<Auth />} />
        <Route path='/onboarding/user/dashboard' element={<Dashboard />} />

        <Route path='/admin'>
          <Route index element={aToken ? <Navigate to='/admin/dashboard' /> : <Login />} />
          <Route element={<ProtectedRoutes><AdminDashboard /></ProtectedRoutes>}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='all-appointments' element={<AllAppointments />} />
            <Route path='add-provider' element={<AddProvider />} />
            <Route path='provider-list' element={<ProviderList />} />
          </Route>
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
      <ToastContainer />
    </>
  )
}

export default App