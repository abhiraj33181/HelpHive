import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from './src/config/db.js'
import connectCloudinary from './src/config/cloudinary.js'
import adminRouter from './src/routes/adminRoutes.js'
import providerRouter from './src/routes/providerRoute.js'
import userRouter from './src/routes/userRoute.js'

connectCloudinary();

const app = express()
app.set('trust proxy', 1)


const PORT = process.env.PORT || 4000

app.use(cors({
    origin : ['http://localhost:5173', 'https://helphive-liard.vercel.app'],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
// API Endpoints 

app.use('/api/admin', adminRouter)
app.use('/api/provider', providerRouter)
app.use('/api/user', userRouter)



connectDB()
    .then(() => {
        console.log('Connected to DB Successfully!!');
        
        app.listen(PORT, () => {
            console.log('Server Started Listening at PORT :', PORT)
        })
    })
    .catch(err => {
        throw new Error(err);
    })
