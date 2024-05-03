'use strict'

import { Router } from 'express'
import { createService, deleteService, getService, getServices, updateService } from './service.controller.js'
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/createService', [validateToken, validateRoleAdmin], createService)
api.get('/getServices', [validateToken], getServices)
api.post('/getService/:id', [validateToken], getService)
api.put('/updateService/:id', [validateToken, validateRoleAdmin], updateService)
api.delete('/deleteService/:id', [validateToken, validateRoleAdmin], deleteService)

export default api
