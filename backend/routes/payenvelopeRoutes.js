import express from 'express'
import { addPayments } from '../controllers/payenvelope.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const payEnvelopeRouter = express.Router()

payEnvelopeRouter.post('/', addPayments)

payEnvelopeRouter.get('/', )

payEnvelopeRouter.get('/:id', )

payEnvelopeRouter.put('/:id', )

payEnvelopeRouter.delete('/:id', )

export default payEnvelopeRouter