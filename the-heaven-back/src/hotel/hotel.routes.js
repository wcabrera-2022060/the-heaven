'use strict'

import { Router } from 'express'
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from './hotel.controller.js'
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/createHotel', [validateToken, validateRoleAdmin], createHotel)
api.get('/getHotels', [validateToken], getHotels)
api.post('/getHotel/:id', [validateToken], getHotel)
api.put('/updateHotel/:id', [validateToken, validateRoleAdmin], updateHotel)
api.delete('/deleteHotel/:id', [validateToken, validateRoleAdmin], deleteHotel)

export default api