'use strict'

import { Router } from "express"
import {
    addService,
    createReservation, deleteReservation, getReservation, getReservations, removeService, updateReservation
} from '../reservation/reservation.controller.js'
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/createReservation', [validateToken], createReservation)
api.get('/getReservations', [validateToken, validateRoleAdmin], getReservations)
api.post('/getReservation/:id', [validateToken, validateRoleAdmin], getReservation)
api.put('/updateReservation/:id', [validateToken], updateReservation)
api.delete('/deleteReservation/:id', [validateToken], deleteReservation)
api.put('/addService/:id', [validateToken], addService)
api.put('/removeService/:id', [validateToken], removeService)

export default api