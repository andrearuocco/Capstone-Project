import Request from '../models/requestSchema.js';
import Employee from '../models/employeeSchema.js';
import transport from '../services/serviceMail.js';
import Profile from '../models/profileSchema.js';
import express from 'express';

const requestsRouter = express.Router()

/* requests */

requestsRouter.post('/api/v1/employee/:id/requests', async (req, res) => {
    const { type, startDate, endDate } = req.body;
    const { id } = req.params; 

    try {
        
        const employee = await Employee.findById(id).populate('profile')
        if (!employee) {
            return res.status(404).json({ error: "Dipendente non trovato" })
        }

        const request = new Request({
            profile: employee.profile._id,
            type,
            startDate,
            endDate,
            status: "pending" // default impostato nello schema
        })

        await request.save()

        // aggiungi richiesta all'array dell'oggetto employee corrispondente
        employee.requests.push(request._id)
        await employee.save()

        // richiesta creata
        res.status(201).json(request)
    } catch (error) {
        
        res.status(500).json({ error: 'Richiesta non inoltrata.' })
    }
})

requestsRouter.patch('/api/v1/employee/:employeeId/requests/:requestId', async (req, res) => {
    try {
        const { employeeId, requestId } = req.params;
        const { status } = req.body;

        // trova la richiesta associata all'impiegato
        const request = await Request.findOne({_id: requestId})
        if (!request) {
            return res.status(404).json({ message: 'Richiesta non trovata' })
        }

        const employee = await Employee.findById(employeeId)
        if (!employee) {
            return res.status(404).json({ message: 'Dipendente non trovato' })
        }

        // verifica se lo stato è 'approved' o 'rejected'
        if (status === 'approved') {
            // calcola la durata della richiesta
            const duration = Math.ceil((new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24)) // durata in giorni

            // aggiorna i campi paidLeave o unpaidLeave dell'employee in base al tipo di richiesta
            if (request.type === 'paid') {
                // se ferie pagate, somma la durata delle ferie al paidLeave dell'employee
                employee.paidLeave = (employee.paidLeave || 0) + duration;
            } else if (request.type === 'unpaid') {
                // se ferie non pagate, somma la durata delle ferie al unpaidLeave dell'employee
                employee.unpaidLeave = (employee.unpaidLeave || 0) + duration;
            } else if (request.type === 'holiday') {
                // aggiorna le ferie disponibili
                employee.holidaysYear = (employee.holidaysYear || 20) - duration;
            }

            await employee.save()
        }

        // aggiorna lo stato della richiesta
        request.status = status
        await request.save()
        await Request.findByIdAndDelete(requestId)

        // rimuovi la richiesta dall'array requests dell'employee
        employee.requests = employee.requests.filter(reqId => reqId.toString() !== requestId)
        await employee.save()

        // prepara il contenuto dell'email utilizzando i dati profile della richiesta 
        const profile = await Profile.findById(request.profile)

        if (!profile) {
            return res.status(404).json({ message: 'Profilo non trovato' })
        }

        const subject = `La tua richiesta è stata ${status === 'approved' ? 'approvata' : 'rifiutata'}`;
        const text = `Ciao ${profile.name},\n\nLa tua richiesta di ${request.type === 'paid' ? 'ferie pagate' : request.type === 'unpaid' ? 'ferie non pagate' : 'vacanza'} dal ${request.startDate.toLocaleDateString()} al ${request.endDate.toLocaleDateString()} è stata ${status === 'approved' ? 'approvata' : 'rifiutata'}.\n\nCordiali saluti,\nIl Team`;

        // messaggio personalizzato
        await transport.sendMail({
            from: 'noreply@azienda.com',
            to: profile.email,
            subject: subject,
            text: text,
            html: `<p>Ciao ${profile.name},</p><p>La tua richiesta di <strong>${request.type === 'paid' ? 'ferie pagate' : request.type === 'unpaid' ? 'ferie non pagate' : 'vacanza'}</strong> dal <strong>${request.startDate.toLocaleDateString()}</strong> al <strong>${request.endDate.toLocaleDateString()}</strong> è stata <strong>${status === 'approved' ? 'approvata' : 'rifiutata'}</strong>.</p><p>Cordiali saluti,<br>Il Team</p>`
        })

        return res.json({ message: `Richiesta ${status}`, employee })
    } catch (error) {

        return res.status(500).json({ message: 'Gestione della richiesta non riuscita' })
    }
})

requestsRouter.get('/requests', async (req,res) => {
    try {

        const requests = await Request.find().populate({
            path: 'profile',  
            model: 'Profile',
        })

/*      
        const requestsWithNames = requests.map(req => ({
            _id: req._id,
            type: req.type,
            startDate: req.startDate,
            endDate: req.endDate,
            status: req.status,
            employee: req.employee, 
            name: req.name, 
            surname: req.surname  
        })) 
*/

        res.send(requests)
    } catch(err) {
        res.status(404).send()
    }
})

/* requests */

export default requestsRouter