import express from 'express'
import { addProvider, adminDashboard, allProvider, appointmentAdmin, appointmentCancel, loginAdmin, logOutUser } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/providerController.js';

const adminRouter = express.Router()


adminRouter.post('/add-provider', authAdmin, upload.single('image'), addProvider)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/logout', logOutUser)
adminRouter.get('/all-providers', authAdmin, allProvider)
adminRouter.post('/change-availablity', authAdmin, changeAvailablity)
adminRouter.get('/appointments', authAdmin, appointmentAdmin)
adminRouter.post('/appointment-cancel', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.get('/profile', authAdmin, (req,res) => res.json({success : true, user : req.user}))

export default adminRouter;