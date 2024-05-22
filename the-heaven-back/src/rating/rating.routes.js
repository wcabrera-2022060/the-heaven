'use strict'

import { Router } from 'express'
import { createRating, deleteRating, getRating, getRatings, updateRating } from '../rating/rating.controller.js'
import { validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/createRating', [validateToken], createRating)
api.get('/getRatings', [validateToken], getRatings)
api.post('/getRating/:id', [validateToken], getRating)
api.put('/updateRating/:id', [validateToken], updateRating)
api.delete('/deleteRating/:id', [validateToken], deleteRating)

export default api