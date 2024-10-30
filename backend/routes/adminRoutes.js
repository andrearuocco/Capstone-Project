import express from 'express'
import { addAdmin, getAllAdmin, getSingleAdmin, editAdmin, deleteAdmin } from '../controllers/admin.controller.js'

const adminRouter = express.Router()

// le rotte che modificano la posizione lavorativa saranno prerogativa solo degli admin 

adminRouter.post('/profile/:profileId/admin', addAdmin) // va ad aggiungere ad un profilo utente la posizione lavorativa come admin 

adminRouter.get('/admin', getAllAdmin) // questa rotta servirà per avere una lista di tutte le posizioni lavorative occupate nell'azienda (con paginazione) 

adminRouter.get('/admin/:id', getSingleAdmin) // questa rotta servirà per ricercare un admin attraverso il proprio id  

adminRouter.put('/admin/:id', editAdmin) 

adminRouter.delete('/admin/:id', deleteAdmin)

export default adminRouter