import Company from '../models/companySchema.js'
import Profile from '../models/profileSchema.js'

export const createCompany = async (req, res) => {
    try {
        const companyData = req.body;
        const newCompany = new Company(companyData);
        await newCompany.save();

        res.status(201).json(newCompany);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione della Company", error: error.message });
    }
};

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find(); 
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero delle Companies", error: error.message });
    }
};

export const getCompanyById = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findById(id); 

        if (!company) {
            return res.status(404).json({ message: "Company non trovata" });
        }

        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero della Company", error: error.message });
    }
};

export const updateCompany = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedCompany = await Company.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCompany) {
            return res.status(404).json({ message: "Company non trovata" });
        }

        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(500).json({ message: "Errore nell'aggiornamento della Company", error: error.message });
    }
};

export const deleteCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCompany = await Company.findByIdAndDelete(id);

        if (!deletedCompany) {
            return res.status(404).json({ message: "Company non trovata" });
        }

        res.status(200).json({ message: "Company eliminata con successo" });
    } catch (error) {
        res.status(500).json({ message: "Errore nell'eliminazione della Company", error: error.message });
    }
};

// companyProfile

export const getProfilesByCompany = async (req, res) => {
    const { companyId } = req.params;

    try {
        const profiles = await Profile.find({ company: companyId });
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei Profili", error: error.message });
    }
};


