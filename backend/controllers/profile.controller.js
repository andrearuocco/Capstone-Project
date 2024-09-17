import Profile from '../models/profileSchema.js'

export const addProfile = async (req, res) => {
    // crea nuova istanza del modello profile con i dati definiti nel corpo della richiesta 
    const profile = new Profile(req.body)
    profile.avatar = profile.avatar ? profile.avatar : 'https://thumbs.dreamstime.com/z/disegno-vettoriale-immagine-profilo-avatar-vuoto-262683009.jpg?ct=jpeg'
    try {
        await profile.save() // salva i dati nel DB
        
        return res.send(profile)  // mando in risposta il nuovo profile salvato 
    } catch (error) {
        return res.status(400).send(error)
    }
}