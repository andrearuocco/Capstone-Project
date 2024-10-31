import express from 'express'
import { adddailytask, getAlldailytask, getdailytask, editdailytask, deletedailytask } from '../controllers/dailytask.controller.js'
import { createOne, getAll, getComment, updateComment, deleteComment } from '../controllers/comment.controller.js'

const dailytaskRouter = express.Router()

dailytaskRouter.post('/employee/:employeeId/dailytask', adddailytask) 

dailytaskRouter.get('/employee/:employeeId/dailytask', getAlldailytask) // sarà usata dai dipendenti per vedere i task assegnati e consentirà loro una ricerca secondo i giorni settimanali

dailytaskRouter.get('/employee/:employeeId/dailytask/:dailytaskId', getdailytask) // i titolari potranno vedere a chi hanno assegnato un task specifico 

dailytaskRouter.put('/employee/:employeeId/dailytask/:dailytaskId', editdailytask) 

dailytaskRouter.delete('/employee/:employeeId/dailytask/:dailytaskId', deletedailytask)


dailytaskRouter.post('/:profileId/employees/:employeeId/dailytasks/:dailytaskId/comments', createOne) 

dailytaskRouter.get('/employees/:employeeId/dailytasks/:dailytaskId/comments', getAll) // tutti i commenti di un task assegnato

dailytaskRouter.get('/employees/:employeeId/dailytasks/:dailytaskId/comments/:commentId', getComment) // un singolo commento di uno specifico task 

dailytaskRouter.put('/employees/:employeeId/dailytasks/:dailytaskId/comments/:commentId', updateComment) 

dailytaskRouter.delete('/employees/:employeeId/dailytasks/:dailytaskId/comments/:commentId', deleteComment)

export default dailytaskRouter