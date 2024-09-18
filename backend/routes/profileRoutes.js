import express from 'express'
import { registerProfile } from '../controllers/profile.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const profileRouter = express.Router()

profileRouter.post('/', registerProfile)

export default profileRouter