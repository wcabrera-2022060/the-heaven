import { Router } from 'express'
import { createInvoice } from './invoice.controller.js'
import { validateToken } from '../../middlewares/validateToken.js'

const api = Router()

api.post('/invoice/:idR?', /* [validateToken], */ createInvoice)

export default api
