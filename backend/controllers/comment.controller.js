import Comment from '../models/commentSchema.js'
import Profile from '../models/profileSchema.js'
import Employee from '../models/employeeSchema.js'

export const createOne = async (req, res) => {
    const { profileId, employeeId, dailytaskId } = req.params;
    const { content } = req.body;

    try {
        const profile = await Profile.findById(profileId) // trova chi sta scrivendo il commento 

        if (!profile) {
            return res.status(404).json({ message: 'Profilo non trovato' })
        }

        const employee = await Employee.findById(employeeId)
        const task = employee.dailyTask.id(dailytaskId)
     
        const comment = new Comment({
            content,
            profile: profileId  // crea un nuovo commento legato alla ricerca di riga 10 (prima istruzione try)
        })

        task.comments.push(comment) // aggiungi il commento nell'array dailyTask dello Schema Employee

        await comment.save()
        await employee.save()

        res.status(201).send({ message: `Commento inserito per il task n.${dailytaskId}`, comment })
    } catch (error) {
        res.status(500).send({ error: 'Errore del server' })
    }
}

export const getAll = async (req, res) => {
    const { employeeId, dailytaskId } = req.params;

    try {
        const employeeProfile = await Employee.findById(employeeId).populate({
            path: 'dailyTask.comments',
            populate: { path: 'profile', select: 'name surname' },
        })
        if (!employeeProfile) {
            return res.status(404).send({ message: 'Questo dipendente non esiste' })
        }

        const task = employeeProfile.dailyTask.id(dailytaskId)
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' })
        }

        res.status(200).send({ comments: task.comments })
    } catch (error) {
        res.status(500).send({ error: 'Errore del server' })
    }
}

export const getComment = async (req, res) => {
    const { employeeId, dailytaskId, commentId } = req.params;

    try {
        const employeeProfile = await Employee.findById(employeeId).populate({
            path: 'dailyTask.comments',
            match: { _id: commentId },
            populate: { path: 'profile', select: 'name surname' },
        })

        if (!employeeProfile) {
            return res.status(404).send({ message: 'Questo dipendente non esiste' })
        }

        const task = employeeProfile.dailyTask.id(dailytaskId)
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' })
        }

        const comment = task.comments.find(c => c._id.toString() === commentId)
        if (!comment) {
            return res.status(404).send({ message: 'Commento non trovato' })
        }

        res.status(200).send(comment)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Errore del server' })
    }
}

export const updateComment = async (req, res) => {
    const { employeeId, dailytaskId, commentId } = req.params;
    const { content } = req.body;

    try {
        const employeeProfile = await Employee.findById(employeeId)
        if (!employeeProfile) {
            return res.status(404).send({ message: 'Questo dipendente non esiste' })
        }

        const task = employeeProfile.dailyTask.id(dailytaskId)
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' })
        }

        // trova l'indice del commento nell'array dei commenti del task
        const commentIndex = task.comments.findIndex(c => c.toString() === commentId)
        if (commentIndex === -1) {
            return res.status(404).send({ message: 'Commento non trovato nel task' })
        }

        // recupera e aggiorna il commento nella collection
        let comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).send({ message: 'Commento non trovato nella collezione' })
        }

        // aggiorna esplicitamente il contenuto e salva
        comment.content = content
        await comment.save()

        // assicura che l'array dei task mantenga il riferimento corretto
        task.comments[commentIndex] = comment._id
        await employeeProfile.save()

        // popola il profilo per includere i dettagli dell'autore del commento
        comment = await comment.populate({
            path: 'profile',
            select: '_id name surname'
        })

        res.status(200).json({
            message: 'Commento aggiornato correttamente',
            comment,
        })
    } catch (error) {
    
        res.status(500).send({ error: 'Errore del server' })
    }
}

export const deleteComment = async (req, res) => {
    const { employeeId, dailytaskId, commentId } = req.params;

    try {
        
        const employee = await Employee.findById(employeeId) // devo utilizzare employee per poi poter modificare la chiave che riguarda i compiti quotidiani che contiene un array 
        if (!employee) {
            return res.status(404).send({ message: 'Questo dipendente non esiste' })
        }

        const task = employee.dailyTask.id(dailytaskId)
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' })
        }

        const commentIndex = task.comments.indexOf(commentId) // cerca il commento nell'array dei task con indexOf + ID comment di params e lo rimuove con lo splice che è un metodo per gli array
        if (commentIndex > -1) {
            task.comments.splice(commentIndex, 1)
        } else {
            return res.status(404).send({ message: 'Commento non presente per questo task quotidiano' })
        }

        await employee.save()

        const deletedComment = await Comment.findByIdAndDelete(commentId)

        res.status(200).send({ message: 'Commento eliminato correttamente' })

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Errore del server' })
    }
}








