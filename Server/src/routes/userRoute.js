import express from 'express'
import { bookAppointment, getProfile, listAppointment, registerUser, updateProfile, userLogin } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", userLogin)

userRouter.get('/getProfile',authUser ,getProfile)
userRouter.post("/updateProfile", upload.single('image'), authUser, updateProfile)
userRouter.post("/bookAppointment", authUser, bookAppointment)
userRouter.get('/listAppointment', authUser, listAppointment)

export default userRouter;