import express from 'express'
import { addAdmin, getAllAdmin, getSingleAdmin, editAdmin, deleteAdmin } from '../controllers/admin.controller.js';
/* import adminAuthor from '../middleware/adminAuthor.js';
import authorization from '../middleware/authorization.js'; */

const adminRouter = express.Router()

// le rotte che modificano la posizione lavorativa saranno prerogativa solo degli admin 
// per cui sarà necessario proteggere queste rotte con un autorizzazione 

adminRouter.post('/profile/:profileId/admin', addAdmin) // questa va a modificare anche un profilo utente specifico nel suo collegamento con la referenza employee (whoIs)

adminRouter.get('/admin', getAllAdmin) // questa rotta servirà per avere una lista di tutte le posizioni lavorative occupate nell'azienda (con paginazione) e per ricercare una singola posizione lavorativa occupata 

adminRouter.get('/admin/:id', getSingleAdmin) // questa rotta servirà per ricercare un dipendente attraverso il proprio id e in virtù della referenza saranno visibili anche le sue buste paga 

adminRouter.put('/admin/:id', /* authorization, adminAuthor, */ editAdmin) 

adminRouter.delete('/admin/:id', deleteAdmin)

export default adminRouter