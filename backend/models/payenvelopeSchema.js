import { Schema, model } from 'mongoose';

const payEnvelopeSchema = new Schema({
    companyData: {
        companyName: { type: String, required: true },
        vatNumber: { type: String, required: true },
        address: {
            street: { type: String },
            city: { type: String },
            postalCode: { type: String },
            province: { type: String },
            country: { type: String }
        },
        IBAN: { type: String, required: true }
    },
    payPeriod: {
        month: { type: String, required: true },
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