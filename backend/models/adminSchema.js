import { Schema, model } from 'mongoose';
import Profile from './profileSchema.js';

const adminSchema = new Schema({
    name: {
        type: String,
        enum: ["Socio", "Amministratore Delegato", "Direttore Tecnico", "Direttore Finanziario", "Direttore Operativo", "Responsabile", "Responsabile Risorse Umane", "Responsabile Vendite"],
        required: true,
    },
    description: String,
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile", 
        required: true
    }
}, { collection: "admin" });

const Admin = model('Admin', adminSchema)
export default Admin