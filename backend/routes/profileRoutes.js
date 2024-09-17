import express from 'express'
import { addProfile } from '../controllers/profile.controller.js';
/* import uploadCloudinary from '../middleware/uploadCloudinary.js'; */

const profileRouter = express.Router()

profileRouter.post('/', addProfile)

export default profileRouter