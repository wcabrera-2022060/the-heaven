'use strict'

import { Router } from 'express'
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from './room.controller.js'
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/createRoom', /* [validateToken, validateRoleAdmin], */ createRoom)
api.get('/getRooms', /* [validateToken], */ getRooms)
api.post('/getRoom/:id', /* [validateToken], */ getRoom)
api.put('/updateRoom/:id', /* [validateToken, validateRoleAdmin], */ updateRoom)
api.delete('/deleteRoom/:id', /* [validateToken, validateRoleAdmin], */ deleteRoom)

export default api