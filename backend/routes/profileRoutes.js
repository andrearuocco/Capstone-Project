import express from 'express'
import { registerProfile, getAllProfile, getSingleProfile, editProfile, deleteProfile, patchProfile } from '../controllers/profile.controller.js';
import uploadCloudinary from '../middleware/uploadCloudinary.js'; 
/* import adminAuthor from '../middleware/adminAuthor.js';
import authorization from '../middleware/authorization.js'; */

const profileRouter = express.Router()

profileRouter.post('/companies/:companyId/profile', registerProfile)

profileRouter.get('/profile', getAllProfile)

profileRouter.get('/profile/:id', getSingleProfile)

profileRouter.put('/profile/:id', editProfile)

profileRouter.delete('/profile/:id', /* authorization, adminAuthor, */ deleteProfile)

profileRouter.patch('/profile/:id/avatar', uploadCloudinary.single('avatar'), patchProfile)

export default profileRouter