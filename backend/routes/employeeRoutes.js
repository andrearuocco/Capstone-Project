import express from 'express'
import { addEmployee, getAllEmployee, getSingleEmployee, editEmployee, deleteEmployee } from '../controllers/employee.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const employeeRouter = express.Router()

/* employeeRouter.post('/', addEmployee) */

// le rotte che modificano la posizione lavorativa saranno prerogativa solo degli admin 
// per cui sarà necessario proteggere queste rotte con un autorizzazione 

employeeRouter.get('/', getAllEmployee) // questa rotta servirà per avere una lista di tutte le posizioni lavorative occupate nell'azienda (con paginazione)

employeeRouter.get('/:id', getSingleEmployee) // questa rotta servirà per ricerca una singola posizione lavorativa occupata o un dipendente attraverso il proprio id 

employeeRouter.put('/:id', editEmployee) 

employeeRouter.delete('/:id', deleteEmployee)

export default employeeRouter