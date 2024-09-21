import payEnvelope from '../models/payenvelopeSchema.js'; // Importa il modello per la busta paga
import Employee from '../models/employeeSchema.js'; // Importa il modello per i dipendenti
import Profile from '../models/profileSchema.js'; // Importa il modello per i profili

export const addPayEnvelope = async (req, res) => {
    try {
      /* const { profileId, employeeId } = req.params; */
    
      // Verifica l'ID del profilo
      console.log(req.params.profileId);
      console.log(req.params.employeeId);
      const profile = await Profile.findById(req.params.profileId);
      
      if (!profile) {
        console.log('Profilo non trovato');
        return res.status(404).json({ error: "Profilo non trovato" });
      }
  
      // Verifica che sia un employee
      if (profile.whoIs.type !== 'employee') {
        console.log('Non è un employee');
        return res.status(400).json({ error: "Questo profilo non è di un employee" });
      }
  
      // Verifica che l'ID dell'employee corrisponda
      if (profile.whoIs.employeeData.toString() !== req.params.employeeId) {
        console.log("L'ID dell'employee non corrisponde");
        return res.status(400).json({ error: "L'ID dell'employee non corrisponde" });
      }
  
      // Cerca l'employee
      console.log('Cercando l\'employee con ID:', req.params.employeeId);
      const employee = await Employee.findById(req.params.employeeId);
      if (!employee) {
        console.log('Employee non trovato');
        return res.status(404).json({ error: "Employee non trovato" });
      }
  
      // Crea la busta paga
      const newPayEnvelope = new payEnvelope(req.body);
      await newPayEnvelope.save();
  
      // Aggiungi la busta paga all'employee
      employee.payments.push(newPayEnvelope._id);
      await employee.save();
  
      return res.status(201).json({
        message: 'Busta paga aggiunta con successo',
        payEnvelope: newPayEnvelope
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Errore del server' });
    }
  };