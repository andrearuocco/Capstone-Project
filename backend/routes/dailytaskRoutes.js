import express from 'express'
import { adddailytask, getAlldailytask, getdailytask, editdailytask, deletedailytask } from '../controllers/dailytask.controller.js'
import { createOne, getAll, getComment, updateComment, deleteComment } from '../controllers/comment.controller.js'

const dailytaskRouter = express.Router()

dailytaskRouter.post('/:profileId/employee/:employeeId/dailytask', adddailytask) 

dailytaskRouter.get('/:profileId/employee/:employeeId/dailytask', getAlldailytask) // sarà usata dai dipendenti per vedere i task assegnati e consentirà loro una ricerca secondo i giorni settimanali

dailytaskRouter.get('/:profileId/employee/:employeeId/dailytask/:dailytaskId', getdailytask) // i titolari potranno vedere a chi hanno assegnato un task specifico (occorre 'il match' tra profileId e employeeId) 

dailytaskRouter.put('/:profileId/employee/:employeeId/dailytask/:dailytaskId', editdailytask) 

dailytaskRouter.delete('/:profileId/employee/:employeeId/dailytask/:dailytaskId', deletedailytask)

dailytaskRouter.post('/:profileId/employee/:employeeId/dailytask/:dailytaskId/comment', createOne) 

dailytaskRouter.get('/:profileId/employee/:employeeId/dailytask/:dailytaskId/comment', getAll) // tutti i commenti di un task assegnato

dailytaskRouter.get('/:profileId/employee/:employeeId/dailytask/:dailytaskId/comment/:commentId', getComment) // un singolo commento di uno specifico task 

dailytaskRouter.put('/:profileId/employee/:employeeId/dailytask/:dailytaskId/comment/:commentId', updateComment) 

dailytaskRouter.delete('/:profileId/employee/:employeeId/dailytask/:dailytaskId/comment/:commentId', deleteComment)

export default dailytaskRouter