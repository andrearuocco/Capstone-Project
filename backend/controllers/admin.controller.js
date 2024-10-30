import Admin from '../models/adminSchema.js';
import Profile from '../models/profileSchema.js';

// aggiungi una nuova posizione Admin
export const addAdmin = async (req, res) => {
    const { profileId } = req.params
    const adminData = { ...req.body, profile: profileId }

    try {
        // verifica che il profilo esista
        const profileExists = await Profile.findById(profileId)
        if (!profileExists) {
            return res.status(404).send({ message: 'Profilo non trovato' })
        }

        // crea una nuova posizione Admin con i dati dal corpo della richiesta
        const admin = new Admin(adminData)
        await admin.save()

        const updatedAdmin = await Admin.findById(admin._id).populate('profile') // mostra i dati Profile nella nuova posizione admin creata
        return res.status(201).send(updatedAdmin)
    } catch (error) {
        return res.status(400).send({ message: "Non sono riuscito ad aggiungere una nuova posizione admin per questa utenza.", error })
    }
}

// mostra tutti gli Admin
export const getAllAdmin = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const perPage = Math.min(parseInt(req.query.perPage, 10) || 4, 6); // max 6 elementi per pagina

        const admins = await Admin.find(req.query.name ? { name: { $regex: req.query.name, $options: 'i' } } : {}) // cerca secondo il nome della posizione Admin occupata
            .sort({ name: 1 }) // ordina gli admin secondo ordine alfabetico enum
            .skip((page - 1) * perPage)
            .limit(perPage)
            .populate('profile');

        const totalResults = await Admin.countDocuments();
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: admins,
            totalPages,
            totalResults,
            page,
        })
    } catch (error) {
        res.status(404).send({ message: 'Non ho recuperato gli Admin.', error })
    }
}

// mostra un singolo Admin
export const getSingleAdmin = async (req, res) => {
    const { id } = req.params
    try {
        const admin = await Admin.findById(id).populate('profile')
        if (!admin) {
            return res.status(404).send({ message: 'Admin non trovato' })
        }
        res.send(admin)
    } catch (error) {
        res.status(404).send({ message: 'Riprova più tardi.', error })
    }
}

// modifica un Admin 
export const editAdmin = async (req, res) => {
    const { id } = req.params
    try {
        const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true }).populate('profile')
        if (!admin) {
            return res.status(404).send({ message: 'Admin non trovato' })
        }
        res.send(admin);
    } catch (error) {
        res.status(400).send({ message: 'Riprova più tardi.', error })
    }
}

// elimina un Admin
export const deleteAdmin = async (req, res) => {
    const { id } = req.params
    try {
        const admin = await Admin.findById(id)
        if (!admin) {
            return res.status(404).send({ message: 'Admin non trovato' })
        }

        await Admin.findByIdAndDelete(id)
        res.status(200).send({ message: `Admin ${id} eliminato con successo` })
    } catch (error) {
        res.status(500).send({ message: 'Riprova più tardi.', error: error.message })
    }
}
