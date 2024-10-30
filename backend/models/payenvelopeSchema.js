import { Schema, model } from 'mongoose';
import Company from './companySchema.js';

const payEnvelopeSchema = new Schema({
    companyData: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    payPeriod: {
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        worked: {
            days: { type: Number, required: true },
            hours: { type: Number, required: true }
        }
    },
    salary: {
        basicSalary: { type: Number, required: true },
        overtime: {
            hours: { type: Number },
            hourlyRate: { type: Number },
            total: { type: Number }
        },
        bonus: { type: Number },
        otherFees: { type: Number },
        total: { type: Number, required: true }
    },
    deductions: {
        taxes: { type: Number, required: true },
        socialContributions: { type: Number, required: true },
        otherDeductions: { type: Number },
        totalDeductions: { type: Number, required: true }
    },
    payCheck: { type: Number, required: true },
    notes: { type: String }
}, { collection: 'payEnvelope' });

const payEnvelope = model('payEnvelope', payEnvelopeSchema);
export default payEnvelope;