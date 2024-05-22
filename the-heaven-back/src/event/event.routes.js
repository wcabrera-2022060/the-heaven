'use strict'

import { Router } from 'express'
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from './event.controller.js'

const api = Router()

api.post('/createEvent', [validateToken, validateRoleAdmin], createEvent)
api.get('/getEvents', [validateToken, validateRoleAdmin], getEvents)
api.post('/getEvent/:id', [validateToken, validateRoleAdmin], getEvent)
api.put('/updateEvent/:id', [validateToken, validateRoleAdmin], updateEvent)
api.delete('/deleteEvent/:id', [validateToken, validateRoleAdmin], deleteEvent)

export default api