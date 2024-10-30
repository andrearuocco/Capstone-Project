import { Schema, model } from 'mongoose';
import Company from './companySchema.js'; 

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
    IBAN: {
        type: String, 
        required: true,
    },
    TIN: {
        type: String,
    },
    company: {  
        type: Schema.Types.ObjectId,
        ref: "Company",
    }
}, { collection: "profiles" });  

const Profile = model('Profile', profileSchema)
export default Profile