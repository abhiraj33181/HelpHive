import express from 'express'
import { addProvider, allProvider, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/providerController.js';

const adminRouter = express.Router()


adminRouter.post('/add-provider', authAdmin, upload.single('image'), addProvider)
adminRouter.post('/login', loginAdmin)
adminRouter.get('/all-providers', authAdmin, allProvider)
adminRouter.post('/change-availablity', authAdmin, changeAvailablity)

export default adminRouter;