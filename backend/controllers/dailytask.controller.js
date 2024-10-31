import Employee from '../models/employeeSchema.js'
import { calculateAverageRating } from '../services/calculate.js'

export const adddailytask = async (req, res) => { 
    const { employeeId } = req.params
    const { day, when, description } = req.body

    try {
        const employee = await Employee.findById(employeeId)

        if (!employee) {
            return res.status(404).json({ message: 'Dipendente non trovato' })
        }

        employee.dailyTask.push({ day, when, description })
        await employee.save()

        const updatedEmployee = await Employee.findById(employeeId).populate('dailyTask')

        res.status(201).json({ 
            message: 'Nuovo compito giornaliero assegnato', 
            updatedEmployee 
        })
    } catch (error) {
        res.status(500).json({ error: 'Riprova più tardi.' })
    }
}

export const getAlldailytask = async (req, res) => {
    const { employeeId } = req.params
    const { day } = req.query

    try {
        const employee = await Employee.findById(employeeId).populate({
            path: 'dailyTask',
            populate: { path: 'comments' }
        })

        if (!employee) {
            return res.status(404).json({ message: 'Dipendente non trovato' })
        }

        let tasks = employee.dailyTask

        if (day) {
            tasks = tasks.filter(task => task.day === day)
        }

        if (tasks.length === 0) {
            return res.status(404).json({ message: `Nessun task trovato per il giorno ${day}` })
        }

        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ error: 'Riprova più tardi.' });
    }
}

export const getdailytask = async (req, res) => {
    const { employeeId, dailytaskId } = req.params

    try {
        const employee = await Employee.findById(employeeId).populate({
            path: 'dailyTask',
            populate: { path: 'comments' }
        })

        if (!employee) {
            return res.status(404).json({ message: 'Dipendente non trovato' })
        }

        const task = employee.dailyTask.id(dailytaskId)

        if (!task) {
            return res.status(404).json({ message: 'Task non trovato' })
        }

        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error: 'Riprova più tardi.' })
    }
}

export const editdailytask = async (req, res) => {
    const { employeeId, dailytaskId } = req.params;
    const { day, when, description } = req.body;
    try {

        const profile = await Employee.findById(employeeId)
        if (!profile) {
            return res.status(404).send({ message: 'Employee not found' })
        }
        
        const task = profile.dailyTask.id(dailytaskId)

        // se sono cambiati i valori nel corpo della richiesta allora assegna alle varie chiavi quei valori 
        if (day) task.day = day;
        if (when) task.when = when;
        if (description) task.description = description;
        // in seguito salva le modifiche nella collection employee 
        await profile.save()
        res.status(200).send({ message: `Task aggiornato per il dipedente ${employeeId}`, profile })

    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' })
    }
}

export const deletedailytask = async (req, res) => {
    const { employeeId, dailytaskId } = req.params

    try {
        const employee = await Employee.findById(employeeId)

        if (!employee) {
            return res.status(404).json({ message: 'Dipendente non trovato' })
        }

        const taskIndex = employee.dailyTask.findIndex(task => task._id.toString() === dailytaskId)

        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task non trovato' })
        }

        employee.dailyTask.splice(taskIndex, 1)

/*      
        employee.ratings.push(rating)
        
        employee.reliabilityRates = calculateAverageRating(employee.ratings) 
*/

        await employee.save()

        res.status(200).json({ message: `Task eliminato per il dipendente ${employeeId}` })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
