import Employee from '../models/employeeSchema.js'
import Profile from '../models/profileSchema.js'
import { deleteEmployee } from './employee.controller.js';

export const adddailytask = async (req, res) => {
    const { profileId, employeeId } = req.params;
    const { day, when, description } = req.body;

    try {
        
        const profile = await Profile.findOne({ 'whoIs.employeeData': employeeId }).populate('whoIs.employeeData') // trova il profilo associato e lo riempie con i dati del modello employee corrispondente all'ID di params
        if (!profile) {
            return res.status(404).json({ message: 'Dipendente non trovato' })
        }

        const employee = profile.whoIs.employeeData

        employee.dailyTask.push({ day, when, description })

        await employee.save()

        const updatedEmployee = await Employee.findById(employeeId).populate('dailyTask');

        res.status(201).json({ 
            message: 'Nuovo compito giornaliero assegnato', 
            updatedEmployee 
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getAlldailytask = async (req, res) => {
    const { employeeId } = req.params
    const { day } = req.query

    try {
        const profile = await Profile.findOne({ 'whoIs.employeeData': employeeId })
            .populate({
                path: 'whoIs.employeeData',
                populate: {
                    path: 'dailyTask',  
                    populate: {
                        path: 'comments'
                    }
                }
            }); // carica i dati profilo popolati con i dati employee secondo le regole dei due Schema
        if (!profile) {
            return res.status(404).send({ message: 'Dipendente non trovato' })
        }

        const employee = profile.whoIs.employeeData;

        let tasks = employee.dailyTask;
        if (day) {
            tasks = tasks.filter(task => task.day === day);  
        }
        if (tasks.length === 0) {
            return res.status(404).send({ message: `Nessun task trovato per ${day}` });
        }

        res.status(200).send({ tasks })
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' })
    }
}

export const getdailytask = async (req, res) => {
    const { profileId, employeeId, dailytaskId } = req.params
    try {
        const profile = await Profile.findOne({ _id: profileId, 'whoIs.employeeData': employeeId }).populate('whoIs.employeeData')

        const employee = profile.whoIs.employeeData

        const task = employee.dailyTask.id(dailytaskId)

        res.status(200).send({
            message: `Il task assegnato al profilo n.${profileId}`,
            profile: profile,  // restituisce employeeData completo in modo che gli admin possono capire a chi hanno assegnato il task  
        })
    } catch (error) {

        res.status(500).send({ error: 'Errore interno del server' })
    }
}

export const editdailytask = async (req, res) => {
    const { employeeId, dailytaskId } = req.params;
    const { day, when, description } = req.body;
    try {

        const profile = await Profile.findOne({ 'whoIs.employeeData': employeeId }).populate('whoIs.employeeData')
        if (!profile) {
            return res.status(404).send({ message: 'Employee not found' })
        }

        const employee = profile.whoIs.employeeData // qui stanno i dati dipendente riferiti al profile cercato attraverso la corrispondenza employeeData: ObjectID = employeeId(params)
        
        const task = employee.dailyTask.id(dailytaskId)

        // se sono cambiati i valori nel corpo della richiesta allora assegna alle varie chiavi quei valori 
        if (day) task.day = day;
        if (when) task.when = when;
        if (description) task.description = description;
        // in seguito salva le modifiche nella collection employee 
        await employee.save()
        res.status(200).send({ message: `Task aggiornato per il dipedente ${employeeId}`, profile })

    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' })
    }
}

export const deletedailytask = async (req, res) => {
    const { employeeId, dailytaskId } = req.params;

    try {
        const profile = await Profile.findOne({ 'whoIs.employeeData': employeeId }).populate('whoIs.employeeData')

        const employee = profile.whoIs.employeeData

        const taskId = employee.dailyTask.findIndex(task => task._id.toString() === dailytaskId)

        employee.dailyTask.splice(taskId, 1)

        await employee.save()

        res.status(200).send({ message: `Hai eliminato questo task per il dipendente ${employeeId}`, profile })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}