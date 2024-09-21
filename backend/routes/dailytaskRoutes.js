import express from 'express'
import { adddailytask/* , getAlldailytask, getdailytask, editdailytask, deletedailytask */ } from '../controllers/dailytask.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const dailytaskRouter = express.Router()

dailytaskRouter.post('/:profileId/employee/:employeeId/dailytask', adddailytask) 

dailytaskRouter.get('/'/* , getAlldailytask */) 

dailytaskRouter.get('/:id'/* , getdailytask */)  

dailytaskRouter.put(':/id'/* , editdailytask */) 

dailytaskRouter.delete('/.id'/* , deletedailytask */)

export default dailytaskRouter