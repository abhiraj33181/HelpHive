import express from 'express'
import { providerList } from '../controllers/providerController.js'

const providerRouter = express.Router()

providerRouter.get('/list', providerList)

export default providerRouter