import payEnvelope from '../models/payenvelopeSchema.js'; 
import Employee from '../models/employeeSchema.js'; 
import Profile from '../models/profileSchema.js'; 

// crea un nuovo pagamento per un dipendente specifico
export const addPayments = async (req, res) => {
  try {
      const { employeeId } = req.params
      const paymentData = req.body

      const newPayment = new payEnvelope(paymentData)
      await newPayment.save()

      await Employee.findByIdAndUpdate(employeeId, {
          $push: { payments: newPayment._id } // aggiungi il pagamento nel profilo dipendente 
      })

      res.status(201).json(newPayment)
  } catch (error) {
      res.status(500).json({ error: 'Pagamento non aggiunto con successo.' })
  }
}

export const getPayments = async (req, res) => {
  try {
    const page = req.query.page || 1
    let perPage = req.query.perPage || 6
    perPage = perPage > 12 ? 6 : perPage

    // crea un oggetto filtro usato per anno e mese
    const filter = {};
    if (req.query.year) {
      filter['payPeriod.year'] = req.query.year; // filtra secondo il valore richiesto alla chiave payPeriod.year
    }
    if (req.query.month) {
      filter['payPeriod.month'] = req.query.month; // filtra secondo il valore richiesto alla chiave payPeriod.month
    }

    if (req.query.companyId) {
      filter['companyData'] = req.query.companyId; // filtra secondo l'Azienda in questione
    } else {
      return res.status(400).json({ error: `${companyId} non riconosciuto.` })
    }

    const payments = await payEnvelope.find(filter)
      .sort({ 'payPeriod.year': -1, 'payPeriod.month': -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalResults = await payEnvelope.countDocuments();
    const totalPages = Math.ceil(totalResults / perPage);

    res.send({
      dati: payments,
      totalPages,
      totalResults,
      page,
    })
  } catch (err) {
    res.status(404).send()
  }
}

export const getSinglePayment = async (req, res) => {
  try {
      const { paymentId } = req.params

      const payment = await payEnvelope.findById(paymentId).populate('companyData')
      if (!payment) {
          return res.status(404).json({ error: 'Pagamento non trovato.' })
      }

      res.json(payment)
  } catch (error) {
      res.status(500).json({ error: 'Riprova più tardi.' });
  }
}

export const employeePayments = async (req, res) => {
  try {
      const { employeeId } = req.params;

      const employee = await Employee.findById(employeeId).populate('payments')
      if (!employee) {
          return res.status(404).json({ error: 'Dipendente non trovato.' })
      }

      res.json(employee.payments)
  } catch (error) {
      res.status(500).json({ error: 'Riprova più tardi.' })
  }
}

export const editPayment = async (req, res) => {
  try {
      const { paymentId } = req.params
      const updateData = req.body

      const updatedPayment = await payEnvelope.findByIdAndUpdate(paymentId, updateData, { new: true })
      if (!updatedPayment) {
          return res.status(404).json({ error: 'Pagamento non trovato.' })
      }

      res.json(updatedPayment)
  } catch (error) {
      res.status(500).json({ error: 'Riprova più tardi.' })
  }
}

export const deletePayment = async (req, res) => {
  try {
      const { paymentId } = req.params

      const deletedPayment = await payEnvelope.findByIdAndDelete(paymentId)
      if (!deletedPayment) {
          return res.status(404).json({ error: 'Pagamento non trovato.' })
      }

      await Employee.updateMany({ payments: paymentId }, {
          $pull: { payments: paymentId }
      }) // rimuovi il riferimento del pagamento dal dipendente associato

      res.status(200).json({ message: 'Pagamento eliminato.' })
  } catch (error) {
      res.status(500).json({ error: 'Riprova più tardi.' })
  }
}


