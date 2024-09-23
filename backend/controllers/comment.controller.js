import Comment from '../models/commentSchema.js'
import Profile from '../models/profileSchema.js'
import Employee from '../models/employeeSchema.js'

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

export const getComment = async (req, res) => {
    const { employeeId, dailytaskId, commentId } = req.params;

    try {
        const employeeProfile = await Profile.findOne({ 'whoIs.employeeData': employeeId })
            .populate({
                path: 'whoIs.employeeData', 
                select: 'dailyTask' 
            });
        if (!employeeProfile) {
            return res.status(404).send({ message: 'Questo dipendente non esiste' });
        }

        const employee = employeeProfile.whoIs.employeeData;
        const task = employee.dailyTask.id(dailytaskId);
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' });
        }

        const comment = await Comment.findOne({
            _id: commentId,
            _id: { $in: task.comments } // operatore che seleziona i documenti in cui il valore di un campo è uguale a commentId specificato
        }).populate({
            path: 'profile', 
            select: 'name surname' 
          });
        res.status(200).send(comment)
    } catch (error) {
        res.status(500).send({ error: 'Errore interno del server' });
    }
}

export const updateComment = async (req, res) => {
    const { employeeId, dailytaskId, commentId } = req.params;
    const { content } = req.body; 
    try {
        const employeeProfile = await Profile.findOne({ 'whoIs.employeeData': employeeId })
            .populate({
                path: 'whoIs.employeeData',
                select: 'dailyTask' 
            });
        if (!employeeProfile) {
            return res.status(404).send({ message: 'Questo dipendente non esiste' });
        }

        const employee = employeeProfile.whoIs.employeeData;
        const task = employee.dailyTask.id(dailytaskId);
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' });
        }

        const comment = await Comment.findOne({
            _id: commentId,
            _id: { $in: task.comments }
        }).populate({
            path: 'profile',
            select: '_id name surname' // se l'ID del profile corrisponde all'ID dell'utenza loggata allora consentirà lato front-end la modifica
        });

        const commentFind = employee.dailyTask.comments.findIndex(comment => comment._id.toString() === commentId)
        employee.dailyTask.comments.splice(commentFind, 1)

        comment.content = content;
        await comment.save();
        res.status(200).send({ message: 'Commento modificato correttamente', comment })
    } catch (error) {
        res.status(500).send({ error: 'Errore interno del server' });
    }
}

export const deleteComment = async (req, res) => {
    const { employeeId, dailytaskId, commentId } = req.params;

    try {
        // Trova il profilo del dipendente
        const employee = await Employee.findById(employeeId);
        
        if (!employee) {
            return res.status(404).send({ message: 'Dipendente non trovato' });
        }

        // Trova il task specifico con dailytaskId
        const task = employee.dailyTask.id(dailytaskId);
        
        if (!task) {
            return res.status(404).send({ message: 'Task non trovato' });
        }

        // Rimuovi il commento dall'array di commenti
        const commentIndex = task.comments.indexOf(commentId);
        if (commentIndex > -1) {
            task.comments.splice(commentIndex, 1);  // Rimuove il commento dall'array
        } else {
            return res.status(404).send({ message: 'Commento non trovato nel task' });
        }

        // Salva l'aggiornamento al documento employee
        await employee.save();

        // Elimina il commento dalla collezione Comment
        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).send({ message: 'Commento non trovato nella collezione Comment' });
        }

        res.status(200).send({ message: 'Commento eliminato correttamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Errore interno del server' });
    }
};








