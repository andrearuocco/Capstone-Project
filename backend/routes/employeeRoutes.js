import express from 'express'
import { addEmployee, getAllEmployee, getSingleEmployee, editEmployee, deleteEmployee } from '../controllers/employee.controller.js';
import Request from '../models/requestSchema.js';
import Employee from '../models/employeeSchema.js';
import employeeAuthor from '../middleware/employeeAuthor.js';

const employeeRouter = express.Router()

// le rotte che modificano la posizione lavorativa saranno prerogativa solo degli admin 
// per cui sarà necessario proteggere queste rotte con un autorizzazione 

employeeRouter.post('/profile/:profileId/employee', addEmployee) // questa va a modificare anche un profilo utente specifico nel suo collegamento con la referenza employee (whoIs)

employeeRouter.get('/employee', getAllEmployee) // questa rotta servirà per avere una lista di tutte le posizioni lavorative occupate nell'azienda (con paginazione) e per ricercare una singola posizione lavorativa occupata 

employeeRouter.get('/employee/:id', getSingleEmployee) // questa rotta servirà per ricercare un dipendente attraverso il proprio id e in virtù della referenza saranno visibili anche le sue buste paga 

employeeRouter.put('/employee/:id', editEmployee) 

employeeRouter.delete('/profile/:profileId/employee/:employeeId', deleteEmployee)

employeeRouter.post('/api/v1/employee/:id/requests', /* employeeAuthor, */ async (req, res) => {
    const { id, type, startDate, endDate } = req.body
    console.log(req.body)
    try {
        const request = new Request({ employee: id, type, startDate, endDate })
        await request.save()
        await Employee.findByIdAndUpdate(id, { $push: { requests: request._id } }, { new: true })
        res.status(201).json(request)
    } catch (error) {
        res.status(500).json({ error: 'Richiesta di permesso non inviata' })
    }
})

export default employeeRouter