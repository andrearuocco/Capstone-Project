import express from 'express'
import { registerProfile, getAllProfile, getSingleProfile, editProfile, deleteProfile, patchProfile } from '../controllers/profile.controller.js';
import uploadCloudinary from '../middleware/uploadCloudinary.js'; 
import requestSchema from '../models/requestSchema.js';
import Employee from '../models/employeeSchema.js';
import adminAuthor from '../middleware/adminAuthor.js';
import authorization from '../middleware/authorization.js';

const profileRouter = express.Router()

profileRouter.post('/', registerProfile)

profileRouter.get('/', getAllProfile)

profileRouter.get('/:id', getSingleProfile)

profileRouter.put('/:id', editProfile)

profileRouter.delete('/:id', deleteProfile)

profileRouter.patch('/:id/avatar', uploadCloudinary.single('avatar'), patchProfile)

profileRouter.patch('/:id/employee/:employeeId/requests/:requestId', authorization, adminAuthor, async (req, res) => {
    const { status } = req.body
    try {
        const request = await requestSchema.findById(req.params.requestId);
        request.status = status;
        await requestSchema.save();

        if (status === 'approved') {
            const employee = await Employee.findById(request.employee);
            if (leaveRequest.type === 'paid') {
                employee.paidLeave += calculateDays(request.startDate, request.endDate);
            } else if (leaveRequest.type === 'unpaid') {
                employee.unpaidLeave += calculateDays(request.startDate, request.endDate);
            } else if (leaveRequest.type === 'holiday') {
                employee.holidaysYear -= calculateDays(request.startDate, request.endDate);
            }
            await employee.save();
        }

        res.status(200).json(request);
    } catch (error) {
        res.status(500).json({ error: 'Errore nel processare la richiesta' });
    }
})

export default profileRouter