'use strict'

import { initServer } from './configs/app.js'
import { connectDB } from './configs/db.js'

initServer()
connectDB()