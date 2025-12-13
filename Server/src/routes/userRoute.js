import express from 'express'
import { bookAppointment, cancelAppointment, getProfile, listAppointment, logOutUser, paymentRazorpay, registerUser, updateProfile, userLogin, verifyRazorpay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import { getChat } from '../controllers/chatController.js';

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", userLogin)
userRouter.post("/logout", logOutUser)

userRouter.get('/getProfile',authUser ,getProfile)
userRouter.post("/updateProfile", upload.single('image'), authUser, updateProfile)
userRouter.post("/bookAppointment", authUser, bookAppointment)
userRouter.get('/listAppointment', authUser, listAppointment)
userRouter.post('/cancelAppointment', authUser, cancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verify-razorpay', authUser, verifyRazorpay)
userRouter.post('/chat', authUser, getChat)

export default userRouter;