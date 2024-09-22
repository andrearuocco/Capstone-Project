import express from 'express'
import { adddailytask, getAlldailytask, getdailytask, editdailytask, deletedailytask } from '../controllers/dailytask.controller.js';

const dailytaskRouter = express.Router()

dailytaskRouter.post('/:profileId/employee/:employeeId/dailytask', adddailytask) 

dailytaskRouter.get('/:profileId/employee/:employeeId/dailytask', getAlldailytask) // sarà usata dai dipendenti per vedere i task assegnati e consentirà loro una ricerca secondo i giorni settimanali

dailytaskRouter.get('/:profileId/employee/:employeeId/dailytask/:dailytaskId', getdailytask) // i titolari potranno vedere a chi hanno assegnato un task specifico 

dailytaskRouter.put('/:profileId/employee/:employeeId/dailytask/:dailytaskId', editdailytask) 

dailytaskRouter.delete('/:profileId/employee/:employeeId/dailytask/:dailytaskId', deletedailytask)

export default dailytaskRouter