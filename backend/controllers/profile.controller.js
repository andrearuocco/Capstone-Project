import Profile from '../models/profileSchema.js'
import bcrypt from "bcrypt"

export const registerProfile = async (req, res) => {
    try {
        // verificare che la mail sia già utilizzata
        const profile = await Profile.findOne({ email: req.body.email })
        if (profile) {
            return res.status(500).send('Mail già nel database.')
        }
        // se non è utilizzata allora registrare il nuovo utente con la password hashata
        const newProfile = new Profile({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            birthday: req.body.birthday,
            avatar: req.file ? req.file.path : 'https://thumbs.dreamstime.com/z/disegno-vettoriale-immagine-profilo-avatar-vuoto-262683009.jpg?ct=jpeg',
            country: req.body.country,
            IBAN: await bcrypt.hash(req.body.IBAN, 20),
            TIN: req.body.TIN,
            whoIs: {
                type: req.body.whoIs.type, // 'admin' or 'employee'
            },
            verifictedAct: new Date()
        })

        // dati specifici per admin o employee
        if (req.body.whoIs.type === 'admin') {

        /*     if (!req.body.whoIs.adminData) {
                return res.status(400).send('Dati admin mancanti.');
            } */

            newProfile.whoIs.adminData = req.body.whoIs.adminData; 
        } else if (req.body.whoIs.type === 'employee') {

        /*             if (!req.body.whoIs.employeeData) {
                return res.status(400).send('Dati employee mancanti.');
            } */

            newProfile.whoIs.employeeData = req.body.whoIs.employeeData; 
        }

        const createdProfile = await newProfile.save()
        res.send(createdProfile)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}