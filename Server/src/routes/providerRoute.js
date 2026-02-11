import express from 'express'
import { appointmentAccept, appointmentCancel, appointmentComplete, appointmentProvider, loginProvider, logOutUser, providerDashboard, providerList, providerProfile, registerProvider, updateProviderProfile } from '../controllers/providerController.js'
import authProvider from '../middlewares/authProvider.js'
import upload from '../middlewares/multer.js'
import { getChat } from '../controllers/chatController.js'

const providerRouter = express.Router()

providerRouter.get('/list', providerList)
providerRouter.get('/logout', logOutUser)
providerRouter.post('/login', loginProvider)
providerRouter.post('/register', registerProvider)
providerRouter.get('/appointments', authProvider ,appointmentProvider)
providerRouter.post('/complete-appointment', authProvider ,appointmentComplete)
providerRouter.post('/accept-appointment', authProvider ,appointmentAccept)
providerRouter.post('/cancel-appointment', authProvider ,appointmentCancel)
providerRouter.get('/dashboard', authProvider , providerDashboard)
providerRouter.get('/profile', authProvider , providerProfile)
providerRouter.post('/update-profile', upload.single('image'), authProvider , updateProviderProfile)
providerRouter.post('/chat', authProvider , getChat)

export default providerRouter