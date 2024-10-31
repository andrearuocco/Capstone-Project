import express from 'express';
import { addEmployee, getAllEmployee, getSingleEmployee, editEmployee, deleteEmployee, rateEmployee } from '../controllers/employee.controller.js';

const employeeRouter = express.Router()

// le rotte che modificano la posizione lavorativa saranno prerogativa solo degli admin 
// per cui sarà necessario proteggere queste rotte con un autorizzazione 

employeeRouter.post('/profile/:profileId/employee', addEmployee) // va ad aggiungere ad un profilo utente la posizione lavorativa come employee

employeeRouter.get('/employee', getAllEmployee) // questa rotta servirà per avere una lista di tutte le posizioni lavorative occupate nell'azienda (con paginazione) e per ricercare una singola posizione lavorativa occupata 

employeeRouter.get('/employee/:id', getSingleEmployee) // questa rotta servirà per ricercare un dipendente attraverso il proprio id e in virtù della referenza saranno visibili anche le sue buste paga 

employeeRouter.put('/employee/:id', editEmployee) 

employeeRouter.delete('/employee/:id', deleteEmployee)

employeeRouter.post('/employee/:id/rate', rateEmployee) // valutazioni su dailyTask assegnati

export default employeeRouter