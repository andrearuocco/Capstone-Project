import Comment from '../models/commentSchema.js'
import Profile from '../models/profileSchema.js'

export const createOne = async (req, res) => {
    const { profileId, employeeId, dailytaskId } = req.params;
    const { content } = req.body;

    try {
        const profile = await Profile.findById(profileId) // trova chi sta scrivendo il commento 

        const employeeProfile = await Profile.findOne({ 'whoIs.employeeData': employeeId }).populate('whoIs.employeeData')
        if (!employeeProfile) {
            return res.status(404).send({ message: 'Utenza non trovata o non associata correttamente ad identificativo dipendenete corrispondente' })
        }

        const employee = employeeProfile.whoIs.employeeData;
        const task = employee.dailyTask.id(dailytaskId);
     
        const comment = new Comment({
            content,
            profile: profileId  // crea un nuovo commento legato alla ricerca di riga 9 (prima istruzione try)
        })

        task.comments.push(comment) // aggiungi il commento nell'array dailyTask dello Schema Employee

        await comment.save()
        await employee.save()

        res.status(201).send({ message: `Commento inserito per il task n.${dailytaskId}`, comment });
    } catch (error) {
        res.status(500).send({ error: 'Errore interno del server' });
    }
}

export const getAll = async (req, res) => {
    const { employeeId, dailytaskId } = req.params;

    try {
        const employeeProfile = await Profile.findOne({ 'whoIs.employeeData': employeeId })
            .populate({
                path: 'whoIs.employeeData',
                populate: {
                    path: 'dailyTask.comments', 
                    populate: {
                        path: 'profile', 
                        model: 'Profile' 
                    }
                }
            });
        if (!employeeProfile) {
            return res.status(404).send({ message: 'Questo dipendente non esiste' });
        }

        const employee = employeeProfile.whoIs.employeeData;
        const task = employee.dailyTask.id(dailytaskId);
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' });
        }

        res.status(200).send({ comments: task.comments })
    } catch (error) {
        res.status(500).send({ error: 'Errore interno del server' })
    }
}
