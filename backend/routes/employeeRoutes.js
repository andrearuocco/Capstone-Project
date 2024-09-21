import express from 'express'
import { addEmployee, getAllEmployee, getSingleEmployee, editEmployee, deleteEmployee } from '../controllers/employee.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const employeeRouter = express.Router()

/* employeeRouter.post('/', addEmployee) */ // questa va fatta per un profilo utente specifico

// le rotte che modificano la posizione lavorativa saranno prerogativa solo degli admin 
// per cui sarà necessario proteggere queste rotte con un autorizzazione 

employeeRouter.get('/', getAllEmployee) // questa rotta servirà per avere una lista di tutte le posizioni lavorative occupate nell'azienda (con paginazione) e per ricercare una singola posizione lavorativa occupata 

employeeRouter.get('/:id', getSingleEmployee) // questa rotta servirà per ricercare un dipendente attraverso il proprio id e in virtù della referenza saranno visibili anche le sue buste paga 

employeeRouter.put('/:id', editEmployee) 

employeeRouter.delete('/:id', deleteEmployee)

export default employeeRouter