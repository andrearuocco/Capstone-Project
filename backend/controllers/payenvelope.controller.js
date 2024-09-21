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
    let perPage = req.query.perPage || 12;
    perPage = perPage > 24 ? 12 : perPage

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
