import express from 'express'
import { getPingControler } from './pingcontroler.js'

const statusRouter = express.Router()



statusRouter.get('/ping', getPingControler )

export default statusRouter