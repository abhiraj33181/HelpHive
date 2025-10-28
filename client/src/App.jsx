import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'

const App = () => {
  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/auth/:authType' element={<Auth/>}/>
      <Route path='/onboarding/user/dashboard' element={<Dashboard/>}/>
    </Routes>
    </>
  )
}

export default App