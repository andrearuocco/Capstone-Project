import express from 'express'
import { registerProfile, getAllProfile, getSingleProfile, editProfile, deleteProfile, patchProfile } from '../controllers/profile.controller.js';
import uploadCloudinary from '../middleware/uploadCloudinary.js'; 
/* import adminAuthor from '../middleware/adminAuthor.js';
import authorization from '../middleware/authorization.js'; */

const profileRouter = express.Router()

profileRouter.post('/', registerProfile)

profileRouter.get('/', getAllProfile)

profileRouter.get('/:id', getSingleProfile)

profileRouter.put('/:id', editProfile)

profileRouter.delete('/:id', /* authorization, adminAuthor, */ deleteProfile)

profileRouter.patch('/:id/avatar', uploadCloudinary.single('avatar'), patchProfile)

export default profileRouter