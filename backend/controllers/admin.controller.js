import Admin from '../models/adminSchema.js';
import Profile from '../models/profileSchema.js';

// Aggiungi un nuovo Admin
export const addAdmin = async (req, res) => {
    const { profileId } = req.params;
    const adminData = { ...req.body, profile: profileId };

    try {
        // Verifica che il profilo esista
        const profileExists = await Profile.findById(profileId);
        if (!profileExists) {
            return res.status(404).send({ message: 'Profilo non trovato' });
        }

        // Crea un nuovo Admin con i dati dal corpo della richiesta
        const admin = new Admin(adminData);
        await admin.save();

        // Popola il profilo associato al nuovo Admin
        const updatedAdmin = await Admin.findById(admin._id).populate('profile');
        return res.status(201).send(updatedAdmin);
    } catch (error) {
        return res.status(400).send({ message: "Errore nella creazione dell'Admin", error });
    }
};

// Ottieni tutti gli Admin
export const getAllAdmin = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const perPage = Math.min(parseInt(req.query.perPage, 10) || 4, 6); // Massimo 6 elementi per pagina

        const admins = await Admin.find(req.query.name ? { name: { $regex: req.query.name, $options: 'i' } } : {})
            .sort({ name: 1 }) // Ordinamento per nome
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
        });
    } catch (error) {
        res.status(404).send({ message: 'Errore nella lettura degli Admin', error });
    }
};

// Ottieni un singolo Admin
export const getSingleAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id).populate('profile');
        if (!admin) {
            return res.status(404).send({ message: 'Admin non trovato' });
        }
        res.send(admin);
    } catch (error) {
        res.status(404).send({ message: 'Errore nella lettura dell\'Admin', error });
    }
};

// Modifica un Admin esistente
export const editAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true }).populate('profile');
        if (!admin) {
            return res.status(404).send({ message: 'Admin non trovato' });
        }
        res.send(admin);
    } catch (error) {
        res.status(400).send({ message: 'Errore nella modifica dell\'Admin', error });
    }
};

// Elimina un Admin
export const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).send({ message: 'Admin non trovato' });
        }

        await Admin.findByIdAndDelete(id);
        res.status(200).send({ message: 'Admin eliminato con successo' });
    } catch (error) {
        res.status(500).send({ message: 'Errore del server', error: error.message });
    }
};
