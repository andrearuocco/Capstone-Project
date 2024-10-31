import express from 'express'
import { addPayments, getPayments, getSinglePayment, employeePayments, editPayment, deletePayment } from '../controllers/payenvelope.controller.js'

const payEnvelopeRouter = express.Router()

payEnvelopeRouter.post('/employees/:employeeId/payments', addPayments) // aggiunge una busta paga per un dipendente specifico indicato nell'url della richiesta

payEnvelopeRouter.get('/payments', getPayments) // elenca tutte le buste paga rilasciate dall'azienda dando la possibilità agli admin di visualizzarle secondo anno e mese attraverso un filtro su payPeriod

payEnvelopeRouter.get('/payments/:paymentId', getSinglePayment) // restituisce una busta paga specifica di un dipendente

payEnvelopeRouter.get('/employees/:employeeId/payments', employeePayments) // leggi i pagamenti di un dipendente

payEnvelopeRouter.put('/payments/:paymentId', editPayment)

payEnvelopeRouter.delete('/payments/:paymentId', deletePayment)

export default payEnvelopeRouter