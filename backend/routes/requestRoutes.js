import Request from '../models/requestSchema.js';
import Employee from '../models/employeeSchema.js';
import transport from '../services/serviceMail.js';
import Profile from '../models/profileSchema.js';
import express from 'express';

const requestsRouter = express.Router()

/* requests */

requestsRouter.post('/api/v1/employee/:id/requests',/*  authorization, */ async (req, res) => {
    const { name, surname, type, startDate, endDate } = req.body
    const { id } = req.params
    try {
        const request = new Request({ employee: id, name, surname, type, startDate, endDate })
        await request.save()
        await Employee.findByIdAndUpdate(id, { $push: { requests: request._id } }, { new: true })
        res.status(201).json(request)
    } catch (error) {
        res.status(500).json({ error: 'Richiesta di permesso non inviata' })
    }
})

requestsRouter.patch('/api/v1/employee/:employeeId/requests/:requestId', async (req, res) => {
    try {
        const { employeeId, requestId } = req.params;
        const { status } = req.body;

        const request = await Request.findOne({ _id: requestId, employee: employeeId })

        if (!request) {
            return res.status(404).json({ message: 'Richiesta non trovata' });
        }

        const employee = await Employee.findById(employeeId)

        if (!employee) {
            return res.status(404).json({ message: 'Dipendente non trovato' });
        }

        // verifica se lo stato è 'approved' o 'rejected'
        if (status === 'approved') {
            // aggiorna i campi paidLeave o unpaidLeave dell'employee in base al tipo di richiesta
            const duration = Math.ceil((new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24)) // durata in interi

            if (request.type === 'paid') {
                // se ferie pagate, somma la durata delle ferie al paidLeave dell'employee
                employee.paidLeave = (employee.paidLeave || 0) + duration;
            } else if (request.type === 'unpaid') {
                // se ferie non pagate, somma la durata delle ferie al unpaidLeave dell'employee
                employee.unpaidLeave = (employee.unpaidLeave || 0) + duration;
            } else if (request.type === 'holiday') {
                employee.holidaysYear = (employee.holidaysYear || 20) - duration;
            }

            await employee.save()
        }

        request.status = status
        await request.save()

        // rimuovi la richiesta dall'array requests dell'employee
        employee.requests = employee.requests.filter(reqId => reqId.toString() !== requestId)
        await employee.save()

        // cancella la richiesta dal database
        await Request.findByIdAndDelete(requestId)

        const profile = await Profile.findOne({ "whoIs.employeeData": employeeId }) // cerca il profile che come employeeData ha employeeId

        // prepara il contenuto dell'email
        const subject = `La tua richiesta è stata ${status === 'approved' ? 'approvata' : 'rifiutata'}`;
        const text = `Ciao ${profile.name},\n\nLa tua richiesta di ${request.type === 'paid' ? 'ferie pagate' : request.type === 'unpaid' ? 'ferie non pagate' : 'vacanza'} dal ${request.startDate.toLocaleDateString()} al ${request.endDate.toLocaleDateString()} è stata ${status === 'approved' ? 'approvata' : 'rifiutata'}.\n\nCordiali saluti,\nIl Team`;

        // invia l'email con messaggio personalizzato
        await transport.sendMail({
            from: 'noreply@azienda.com', 
            to: profile.email, 
            subject: subject, 
            text: text, 
            html: `<p>Ciao ${profile.name},</p><p>La tua richiesta di <strong>${request.type === 'paid' ? 'ferie pagate' : request.type === 'unpaid' ? 'ferie non pagate' : 'vacanza'}</strong> dal <strong>${request.startDate.toLocaleDateString()}</strong> al <strong>${request.endDate.toLocaleDateString()}</strong> è stata <strong>${status === 'approved' ? 'approvata' : 'rifiutata'}</strong>.</p><p>Cordiali saluti,<br>Il Team</p>` 
        })

        return res.json({ message: `Richiesta ${status}`, employee });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Gestione della richesta non riuscita' })
    }
})

requestsRouter.get('/requests', async (req,res) => {
    try {

        const requests = await Request.find().populate({
            path: 'employee',  
            model: 'Employee',
        })

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

        res.send(requestsWithNames);
    } catch(err) {
        res.status(404).send();
    }
})

/* requests */

export default requestsRouter