import express from 'express'
import { addProvider, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router()


adminRouter.post('/add-provider', upload.single('image'), addProvider)
adminRouter.post('/login', loginAdmin)

export default adminRouter;