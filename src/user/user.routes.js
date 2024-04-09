'use strict'

import { Router } from 'express'
import { createUser, deleteUser, getUser, getUsers, login, updateUser } from './user.controller.js'
import { validateRoleAdmin, validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/createUser', createUser)
api.post('/login', login)

api.put('/updateUser/:id', [validateToken], updateUser)
api.delete('/deleteUser/:id', [validateToken], deleteUser)

api.get('/getUsers', [validateToken, validateRoleAdmin], getUsers)
api.post('/getUser/:id', [validateToken, validateRoleAdmin], getUser)

export default api