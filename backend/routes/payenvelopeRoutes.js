import express from 'express'
import { addPayments, getPayments, getSinglePayment, editPayment, deletePayment } from '../controllers/payenvelope.controller.js'
/* import adminAuthor from '../middleware/adminAuthor.js'
import authorization from '../middleware/authorization.js' */

const payEnvelopeRouter = express.Router()

payEnvelopeRouter.post('/profile/:profileId/employee/:employeeId/payEnvelope', /* authorization, adminAuthor, */ addPayments) // aggiunge una busta paga per un dipendente specifico indicato nell'url della richiesta

payEnvelopeRouter.get('/payEnvelope', getPayments) // elenca tutte le buste paga rilasciate dall'azienda dando la possibilità agli admin di visualizzarle secondo anno e mese attraverso un filtro su payPeriod

payEnvelopeRouter.get('/employee/:employeeId/payEnvelope/:payEnvelopeId', getSinglePayment) // restituisce una busta paga specifica di un dipendente 

payEnvelopeRouter.put('/employee/:employeeId/payEnvelope/:payEnvelopeId', /* authorization, adminAuthor, */ editPayment)

payEnvelopeRouter.delete('/employee/:employeeId/payEnvelope/:payEnvelopeId', /* authorization, adminAuthor, */ deletePayment)

export default payEnvelopeRouter