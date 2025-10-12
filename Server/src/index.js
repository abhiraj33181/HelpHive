import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'

dotenv.config()


const app = express()

const PORT = process.env.PORT

app.get("/", (req,res) => {
    res.send('API working fine!!!')
})

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
