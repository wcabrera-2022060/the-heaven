'use strict'

import { initServer } from './configs/app.js'
import { connectDB } from './configs/db.js'
import { adminDefault } from './src/user/user.controller.js'

initServer()
connectDB()
adminDefault()