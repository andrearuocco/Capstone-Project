import express from 'express'
import { addPayments, getPayments, getSinglePayment } from '../controllers/payenvelope.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const payEnvelopeRouter = express.Router()

payEnvelopeRouter.post('/profile/:profileId/employee/:employeeId/payEnvelope', addPayments) // aggiunge una busta paga per un dipendente specifico indicato nell'url della richiesta

payEnvelopeRouter.get('/payEnvelope', getPayments) // elencate tutte le buste paga rilasciate dall'azienda dando la possibilità agli admin di visualizzarle secondo anno e mese attraverso un filtro su payPeriod

payEnvelopeRouter.get('/employee/:employeeId/payEnvelope/:payEnvelopeId', getSinglePayment) // restituisce una busta paga specifica di un dipendente 

payEnvelopeRouter.put('/employee/:employeeId/payEnvelope/:payEnvelopeId', )

payEnvelopeRouter.delete('/:id', )

export default payEnvelopeRouter