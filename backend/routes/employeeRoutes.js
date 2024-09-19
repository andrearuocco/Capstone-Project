import express from 'express'
import { addEmployee } from '../controllers/employee.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const employeeRouter = express.Router()

/* employeeRouter.post('/', addEmployee) */

export default employeeRouter