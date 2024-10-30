import { Schema, model } from 'mongoose';
import Profile from './profileSchema.js';

const companySchema = new Schema({
    companyName: { type: String, required: true },
    vatNumber: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        postalCode: { type: String },
        province: { type: String },
        country: { type: String }
    },
    IBAN: { type: String, required: true },
    profiles: [{
        type: Schema.Types.ObjectId,
        ref: "Profile", 
        required: true
    }]
}, { collection: 'companies' });

const company = model('Company', companySchema);
export default company;