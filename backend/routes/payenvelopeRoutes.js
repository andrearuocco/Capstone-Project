import express from 'express'
import { addPayments, getPayments } from '../controllers/payenvelope.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const payEnvelopeRouter = express.Router()

payEnvelopeRouter.post('/profile/:profileId/employee/:employeeId/payEnvelope', addPayments) // aggiunge una busta paga per un dipendente specifico indicato nell'url della richiesta

payEnvelopeRouter.get('/payEnvelope', getPayments)

payEnvelopeRouter.get('/:id', )

payEnvelopeRouter.put('/:id', )

payEnvelopeRouter.delete('/:id', )

export default payEnvelopeRouter