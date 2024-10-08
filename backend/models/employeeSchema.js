import { Schema, model } from 'mongoose';
import Comment from './commentSchema.js';
import payEnvolope from './payenvelopeSchema.js';

const tasksSchema = new Schema({
    day: {
        type: String,
        enum: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"],
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
    reliabilityRates: {
        type: Number,
        minimum: 0,
        maximum: 5,
        multipleOf: 0.1,
    },
    // ?? come rotta sarà necessaria una richiesta di permesso poi da poter approvare 
    paidLeave: {
        type: Number,
    },
    unpaidLeave: {
        type: Number,
    },
    // come rotta sarà necessaria una richiesta di permesso poi da poter approvare ??
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
    }]
}, { collection: "employees" }); 

const Employee = model('Employee', employeeSchema);
export default Employee;
