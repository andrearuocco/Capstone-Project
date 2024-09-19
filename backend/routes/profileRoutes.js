import express from 'express'
import { registerProfile, getAllProfile, getSingleProfile, editProfile, deleteProfile } from '../controllers/profile.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const profileRouter = express.Router()

profileRouter.post('/', registerProfile)

profileRouter.get('/', getAllProfile)

profileRouter.get('/:id', getSingleProfile)

profileRouter.put('/:id', editProfile)

profileRouter.delete('/:id', deleteProfile)

export default profileRouter