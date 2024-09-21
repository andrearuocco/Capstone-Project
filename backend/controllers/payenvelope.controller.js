import payEnvelope from '../models/payenvelopeSchema.js'; // Importa il modello per la busta paga
import Employee from '../models/employeeSchema.js'; // Importa il modello per i dipendenti
import Profile from '../models/profileSchema.js'; // Importa il modello per i profili

export const addPayments = async (req, res) => {
    const { profileId, employeeId } = req.params;
    const paymentsData = req.body; 
    try {
        // verifica che il profilo esista
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404)
        }

        // verifica che il dipendente esista ed appartenga al profilo
        const employee = await Employee.findById(employeeId);
        if (!employee || employee._id.toString() !== profile.employeeData.toString()) {
            return res.status(404).json({ message: 'Il dipendente non esiste o employeeData non è associato a questo profilo.' });
        }

        // crea una nuova busta paga
        const newpayments = new payEnvelope({
            ...paymentsData,
        });

        await newpayments.save(); 

        // aggiungi l'ID della busta paga all'array payments del dipendente
        employee.payments.push(newpayments._id);
        await employee.save(); // salva le modifiche al dipendente

        return res.status(201).json({
            message: 'Busta paga inserita correttamente.',
            data: newpayments
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Errore aggiunta busta paga.',
            error: error.message
        });
    }
};