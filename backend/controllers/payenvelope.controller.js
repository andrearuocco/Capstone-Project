import payEnvelope from '../models/payenvelopeSchema.js'; 
import Employee from '../models/employeeSchema.js'; 
import Profile from '../models/profileSchema.js'; 

export const addPayments = async (req, res) => {
  try {
    // verifica l'ID del profilo
    console.log(req.params.profileId); // id profile
    console.log(req.params.employeeId); // id employee

    const profile = await Profile.findById(req.params.profileId);
    if (!profile) {
      console.log('Questa utenza non esiste');
      return res.status(404).json({ error: "Questa utenza non esiste" });
    }

    // verifica che sia un employee
    if (profile.whoIs.type !== 'employee') {
      console.log('Questo profilo non è di un dipendente');
      return res.status(400).json({ error: "Questo profilo non è di un dipendente" });
    }

    // verifica che l'ID dell'employee corrisponda
    if (profile.whoIs.employeeData.toString() !== req.params.employeeId) {
      console.log('Questo profilo non corrisponde con i rispettivi dati dipendente');
      return res.status(400).json({ error: "Questo profilo non corrisponde con i rispettivi dati dipendente" });
    }

    // cerca l'employee
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      console.log('Dipendente non trovato');
      return res.status(404).json({ error: "Dipendente non trovato" });
    }

    // crea la busta paga
    const newpayments = new payEnvelope(req.body);
    await newpayments.save();

    // aggiungi la busta paga all'employee
    employee.payments.push(newpayments._id);
    await employee.save();

    return res.status(201).json({
      message: `Busta paga inserita per il dipendente con ID ${req.params.employeeId}`,
      payEnvelope: newpayments
    });

  } catch (error) {

    return res.status(500).json({ error: 'Errore server' });
  }
};

export const getPayments = async (req, res) => {
  try {
    const page = req.query.page || 1;
    let perPage = req.query.perPage || 6;
    perPage = perPage > 12 ? 6 : perPage

    // crea un oggetto filtro usato per anno e mese
    const filter = {};
    if (req.query.year) {
      filter['payPeriod.year'] = req.query.year; // filtra secondo il valore richiesto alla chiave payPeriod.year
    }
    if (req.query.month) {
      filter['payPeriod.month'] = req.query.month;  // filtra secondo il valore richiesto alla chiave payPeriod.month
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
    });
  } catch (err) {
    res.status(404).send();
  }
}

export const getSinglePayment = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId).populate({
      path: 'payments',
      model: 'payEnvelope',
      match: { _id: req.params.payEnvelopeId } 
    });

    // controlla se il dipendente e la busta paga esistono
    if (!employee || !employee.payments.length) {
      return res.status(404).send({ message: 'Not Found' });
    }

    // restituisce solo il payments identificato con l'ID e lo 'tira fuori' dall'array
    const payment = employee.payments[0];
    res.send(payment);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

export const editPayment = async (req, res) => {
  const { employeeId, payEnvelopeId } = req.params;
  const updatedFields = req.body; 

  try {
    
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Dipendente non trovato' });
    }

    const payment = await payEnvelope.findByIdAndUpdate(payEnvelopeId, updatedFields, { new: true });

    res.status(200).json({
      message: 'Busta paga aggiornata correttamente',
      payment
    });

  } catch (error) {

    console.error('Errore in fase di aggiornamento:', error);
    res.status(500).json({ message: 'Internal server error' });

  }
}

export const deletePayment = async (req, res) => {
  const { employeeId, payEnvelopeId } = req.params;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Dipendente non trovato' });
    }
    const payment = await payEnvelope.exists({ _id: req.params.payEnvelopeId })
    if (payment) {
      const paymentToDelete = await payEnvelope.findOneAndDelete(payEnvelopeId)
      return res.status(200).send(`Cancellata pagamento con n. ID: ${payEnvelopeId}`)
    } else {
      return res.status(404).send({ message: 'Payment not found' })
    }
  } catch (error) {
    res.status(400).send(error)
  }

}
