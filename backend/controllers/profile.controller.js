import Profile from '../models/profileSchema.js'
import bcrypt from "bcrypt"
import transport from '../services/serviceMail.js'
import Company from '../models/companySchema.js'

export const registerProfile = async (req, res) => {
    const { companyId } = req.params;
    let newProfile
    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company non trovata' });
        }

        // verificare che la mail sia già utilizzata
        const profile = await Profile.findOne({ email: req.body.email })
        if (profile) {
            return res.status(500).send('Mail già nel database.')
        }

        // se non è utilizzata allora registrare il nuovo utente con la password hashata
        newProfile = new Profile({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            birthday: req.body.birthday,
            avatar: req.file ? req.file.path : 'https://thumbs.dreamstime.com/z/disegno-vettoriale-immagine-profilo-avatar-vuoto-262683009.jpg?ct=jpeg',
            country: req.body.country,
            IBAN: req.body.IBAN,
            TIN: req.body.TIN,
            company: companyId,
            verifictedAct: new Date()
        })

        const createdProfile = await newProfile.save()
        res.send(createdProfile)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

    try {
        const profile = await Profile.findById(newProfile._id)
        await transport.sendMail({
            from: 'noreply@epicoders.com', // sender address
            to: profile.email, // list of receivers
            subject: "Nuova Utenza Creata", // Subject line
            text: "Adesso sei dei nostri, benvenuto!!", // plain text body
            html: "<b>Adesso sei dei nostri, benvenuto!!</b>" // html body
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllProfile = async (req,res) => {
    try {
/*      
        const page = req.query.page || 1;
        let perPage = req.query.perPage || 3;
        perPage = perPage > 9 ? 3 : perPage  // se l'utente richiede più di 20 profiles su una pagina saranno mostrati 3 profiles come di default 
*/

        const profile = await Profile.find()
/*          
            .collation({locale: 'it'}) //serve per ignorare maiuscole e minuscole nell'ordine alfabetico del sort
            .sort({name:1, surname:1})  // ordino gli oggetti JSON in ordine alfabetico secondo il nome e la cognome
            .skip((page - 1) * perPage) // salto documenti pagina precedente 
            .limit(perPage); // indico gli elementi da mostrare per pagina

        const totalResults = await Profile.countDocuments(); // conta tutti i documenti profile nella collection 
        const totalPages = Math.ceil(totalResults / perPage); 
*/

        res.send(
/*      {
            dati: 
*/          profile
/*          totalPages,
            totalResults,
            page,
        } */
        )
    } catch(err) {
        res.status(404).send()
    }
}

export const getSingleProfile = async (req,res)=>{
    const {id} =req.params
    try {
        const profile = await Profile.findById(id)
        res.send(profile) 
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }
}

export const editProfile = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        // trova il profilo da aggiornare
        const profile = await Profile.findById(id);

        if (!profile) {
            return res.status(404).send({ message: 'Profilo non trovato.' })
        }

        // gestisci l'aggiornamento della password 
        if (password) {
            req.body.password = await bcrypt.hash(password, 10);
        } else {
            delete req.body.password;  // non aggiornare la password se non è stata fornita una nuova
        }

        // esegui l'aggiornamento del profilo
        const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true })

        res.send(updatedProfile)
    } catch (err) {
        console.error('Errore durante aggiornamento profilo:', err)
        res.status(400).send({ error: 'Errore durante aggiornamento profilo' })
    }
}

export const deleteProfile = async (req, res) => {
    const { id } = req.params
    try {
        const profile = await Profile.findByIdAndDelete(id)
        
        res.send(`Successfully deleted profile with id ${id}.`)
    } catch (error) {
        res.status(404).send({ message: `Profile ${id} not found` })
    }
}

export const patchProfile = async (req, res) => {
    // la patch serve per modificare una risorsa nel DB che esiste già
    const { id } = req.params // recupero l'id dalla richiesta
    try {
        const profile = await Profile.findByIdAndUpdate(id, { avatar: req.file.path }, { new: true }) // trovo profile attraverso il proprio id esplicitato nella richiesta e lo modifica secondo il corpo di quest'ultima

        res.status(200).send(profile)
    } catch(error) {
        res.status(400).send(error)
    }
}