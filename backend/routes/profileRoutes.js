import express from 'express'
import { registerProfile, getAllProfile, getSingleProfile, editProfile, deleteProfile, patchProfile } from '../controllers/profile.controller.js';
import uploadCloudinary from '../middleware/uploadCloudinary.js'; 
import Request from '../models/requestSchema.js';
import Employee from '../models/employeeSchema.js';

const profileRouter = express.Router()

profileRouter.post('/', registerProfile)

profileRouter.get('/', getAllProfile)

profileRouter.get('/:id', getSingleProfile)

profileRouter.put('/:id', editProfile)

profileRouter.delete('/:id', deleteProfile)

profileRouter.patch('/:id/avatar', uploadCloudinary.single('avatar'), patchProfile)

export default profileRouter