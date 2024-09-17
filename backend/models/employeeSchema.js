import { Schema, model } from 'mongoose';

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
    paidLeave: {
        type: Number,
        unit: String,
    },
    unpaidLeave: {
        type: Number,
        unit: String,
    },
    holidaysYear: {
        type: Number,
        unit: String,
        minimum: 20,
    },
    dailyTask: [], // tasksSchema => compiti per l'ottimizzazione della gestione delle risorse umane 
    payments: [{
        type: Schema.Types.ObjectId,
        ref: "payEnvelope"
    }]
}, { collection: "employees" }); 

const Employee = model('Employee', employeeSchema);
export default Employee;
