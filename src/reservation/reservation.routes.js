'use strict'

import { Router } from "express"
import {
    createReservation, deleteReservation, getReservation, getReservations, updateReservation
} from '../reservation/reservation.controller.js'
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/createReservation', [validateToken], createReservation)
api.get('/getReservations', [validateToken, validateRoleAdmin], getReservations)
api.post('/getReservation/:id', [validateToken, validateRoleAdmin], getReservation)
api.put('/updateReservation/:id', [validateToken], updateReservation)
api.delete('/deleteReservation/:id', [validateToken], deleteReservation)

export default api