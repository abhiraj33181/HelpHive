import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import Providers from './Pages/Providers'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyAppointments from './Pages/MyAppointments'
import MyProfile from './Pages/MyProfile'
import Appointment from './Pages/Appointment'
import Header from './components/Header'

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/providers' element={<Providers/>}/>
      <Route path='/providers/:speaciality' element={<Providers/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/my-appointment' element={<MyAppointments/>}/>
      <Route path='/appointment' element={<Appointment/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/auth/:authType' element={<Auth/>}/>
      <Route path='/onboarding/user/dashboard' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App