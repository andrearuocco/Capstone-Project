import {model, Schema} from 'mongoose'
import Employee from './employeeSchema.js';

const requestSchema = new Schema({
    name: {type: String},
    surname: {type: String},
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    type: { type: String, enum: ['paid', 'unpaid', 'holiday'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { collection: "requests", timestamps: true, })

export default model('Request', requestSchema)
