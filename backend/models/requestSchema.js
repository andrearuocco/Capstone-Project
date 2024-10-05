import {model, Schema} from 'mongoose'
import Employee from './employeeSchema.js';

const requestSchema = new Schema({
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    type: { type: String, enum: ['paid', 'unpaid', 'holiday'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true })

const Request = model('Request', requestSchema)
export default Request