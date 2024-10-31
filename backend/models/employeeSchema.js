import { Schema, model } from 'mongoose';
import Comment from './commentSchema.js';
import payEnvolope from './payenvelopeSchema.js';
import Profile from './profileSchema.js';

const tasksSchema = new Schema({
    day: {
        type: Date,
        required: true,
    },
    when: {
        type: String,
        enum: ["Mattina", "Pomeriggio"],
        required: true,
    },
    description: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
}); 

const employeeSchema = new Schema({
    role: {
        type: String,
        required: true,
    },
    qualifications: String,
    ratings: [Number],
    reliabilityRates: {
        type: Number,
        minimum: 0,
        maximum: 5,
        multipleOf: 0.1,
    },
    paidLeave: {
        type: Number,
    },
    unpaidLeave: {
        type: Number,
    },
    holidaysYear: {
        type: Number,
        minimum: 20,
    },
    dailyTask: [tasksSchema], // compiti per l'ottimizzazione della gestione delle risorse umane 
    payments: [{
        type: Schema.Types.ObjectId,
        ref: "payEnvelope"
    }],
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'Request',
    }],
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile", 
        required: true
    }
}, { collection: "employees" }); 

const Employee = model('Employee', employeeSchema)
export default Employee
