import express from 'express'
import { addPayEnvelope } from '../controllers/payenvelope.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const payEnvelopeRouter = express.Router()

payEnvelopeRouter.post('/profile/:profileId/employee/:employeeId/payEnvelope', addPayEnvelope)

payEnvelopeRouter.get('/', )

payEnvelopeRouter.get('/:id', )

payEnvelopeRouter.put('/:id', )

payEnvelopeRouter.delete('/:id', )

export default payEnvelopeRouter