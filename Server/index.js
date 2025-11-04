import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './src/config/db.js'
import connectCloudinary from './src/config/cloudinary.js'
import adminRouter from './src/routes/adminRoutes.js'

connectCloudinary();

const app = express()


const PORT = process.env.PORT || 4000

app.use(cors({
    origin : ['http://localhost:5173', 'https://helphive-liard.vercel.app'],
    credentials: true
}))
app.use(express.json())

// API Endpoints 

app.use('/api/admin', adminRouter)


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
