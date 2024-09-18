import Profiles from "../models/profileSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// login utente con user e pass
export const loginUser = async function(req,res){
    
    //ricerco l'utente tramite la mail
    const profile = await Profiles.findOne({email: req.body.email}).select('+password')
    
    // se non esiste l'autore, errore
    if(!profile) return res.status(400).send('Unauthorized Access')

    if (!(await bcrypt.compare(req.body.password, profile.password))) {
        // ricerca della mail riuscita
        return res.status(401).send('Credenziali errate.')
    }
    
    // se siamo arrivati fin qui, rilascio il token jwt
    jwt.sign(
        // payload (utile per recuperare l'id dell'utente)
        {
            profileId: profile.id,
        },
        // secret per firmare il token 
        process.env.JWT_SECRET,
        // opzioni (durata del token)
        {
            expiresIn: '1h'
        },
        // callback (non posso usare async await)
        (err, jwtToken) => {
            if(err) return res.status(500).send('Server error')
            res.send({
                token: jwtToken,
            })
        }
    )
}

// get dei dati dell'utente
export const getUserData = async function(req,res){
    // il middleware authentication aggiunge alla req la proprietà loggedUser, che contiene i dati dell'utente individuato sul DB e corrispondente alla mail utilizzata per il login

    return res.send(req.loggedProfile);
}

export const callbackGoogle = async (req,res) => {
    // passport ci crea nella richiesta un oggetto user, a cui noi possiamo poi aggiungere per esempio la proprietà token
	
    // effettuo il redirect alla home
	res.redirect(`http://localhost:3000?token=${req.user.jwtToken}`) // da inserire indirizzo di caricamento front-end
}