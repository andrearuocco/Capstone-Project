import { Schema, model } from 'mongoose';
import Employee from './employeeSchema.js';

const adminSchema = new Schema({
    name: {
        type: String,
        enum: ["Socio", "Amministratore Delegato", "Direttore Tecnico", "Direttore Finanziario", "Direttore Operativo", "Responsabile", "Responsabile Risorse Umane", "Responsabile Vendite"],
        required: true,
    },
    description: String,
}); // lo schema sarà embeddato in quello generale dei profili delle utenze 

const profileSchema = new Schema({ 
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    country: {
        type: String,
    },
    avatar: {
        type: String,
    },
    googleId: String, 
    // SPIDId: String, 
    IBAN: {
        type: String, 
        required: true,
    },
    TIN: {
        type: String,
    },
    whoIs: {
        type: {
            type: String,
            enum: ['admin', 'employee'], // è un admin o un employee
            required: true,
        },
        // se l'utente è un admin, usa lo schema embeddato
        adminData: {
            type: adminSchema,
            required: function() { return this.whoIs.type === 'admin'; }
        },
        // se l'utente è un employee, usa un ObjectId per referenziare uno schema esterno
        employeeData: {
            type: Schema.Types.ObjectId,
            ref: 'Employee',  // fa riferimento al modello Employee
            required: function() { return this.whoIs.type === 'employee'; }
        }
    }
}, { collection: "profiles" });  

const Profile = model('Profile', profileSchema);
export default Profile;