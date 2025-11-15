import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentProvider, loginProvider, logOutUser, providerDashboard, providerList, providerProfile, updateProviderProfile } from '../controllers/providerController.js'
import authProvider from '../middlewares/authProvider.js'

const providerRouter = express.Router()

providerRouter.get('/list', providerList)
providerRouter.get('/logout', logOutUser)
providerRouter.post('/login', loginProvider)
providerRouter.get('/appointments', authProvider ,appointmentProvider)
providerRouter.post('/complete-appointment', authProvider ,appointmentComplete)
providerRouter.post('/cancel-appointment', authProvider ,appointmentCancel)
providerRouter.get('/dashboard', authProvider , providerDashboard)
providerRouter.get('/profile', authProvider , providerProfile)
providerRouter.post('/update-profile', authProvider , updateProviderProfile)

export default providerRouter