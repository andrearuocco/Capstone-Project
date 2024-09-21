import Employee from '../models/employeeSchema.js'
import Profile from '../models/profileSchema.js'

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

        const updateProfile = await Profile.findById(profileId).populate({
            path: 'whoIs.employeeData',  
            model: 'Employee',
        })

        res.status(201).json({ message: 'Nuova compito giornaliero assegnato', updateProfile });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
/* getAlldailytask
getdailytask
editdailytask
deletedailytask */