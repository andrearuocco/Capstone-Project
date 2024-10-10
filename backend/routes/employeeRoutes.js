import express from 'express'
import { addEmployee, getAllEmployee, getSingleEmployee, editEmployee, deleteEmployee } from '../controllers/employee.controller.js';
import Request from '../models/requestSchema.js';
import Employee from '../models/employeeSchema.js';
/* import authorization from '../middleware/authorization.js' */

const employeeRouter = express.Router()

// le rotte che modificano la posizione lavorativa saranno prerogativa solo degli admin 
// per cui sarà necessario proteggere queste rotte con un autorizzazione 

employeeRouter.post('/profile/:profileId/employee', addEmployee) // questa va a modificare anche un profilo utente specifico nel suo collegamento con la referenza employee (whoIs)

employeeRouter.get('/employee', getAllEmployee) // questa rotta servirà per avere una lista di tutte le posizioni lavorative occupate nell'azienda (con paginazione) e per ricercare una singola posizione lavorativa occupata 

employeeRouter.get('/employee/:id', getSingleEmployee) // questa rotta servirà per ricercare un dipendente attraverso il proprio id e in virtù della referenza saranno visibili anche le sue buste paga 

employeeRouter.put('/employee/:id', editEmployee) 

employeeRouter.delete('/profile/:profileId/employee/:employeeId', deleteEmployee)

employeeRouter.post('/api/v1/employee/:id/requests',/*  authorization, */ async (req, res) => {
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

employeeRouter.patch('/api/v1/employee/:employeeId/requests/:requestId', async (req, res) => {
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

        return res.json({ message: `Richiesta ${status}`, employee })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Gestione della richesta non riuscita' })
    }
})

employeeRouter.get('/requests', async (req,res) => {
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

export default employeeRouter