'use strict'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import userRoutes from '../src/user/user.routes.js'

const app = express()
config()
const port = process.env.PORT || 3300

app.use(express.urlencoded({ extended: false }))
app.use(express.json({}))
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

app.use(userRoutes)

export const initServer = () => {
    app.listen(port, () => { console.log(`Server listen in port ${port}`) })
}