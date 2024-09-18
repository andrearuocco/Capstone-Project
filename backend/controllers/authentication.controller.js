import Profiles from "../models/profileSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// login utente con user e pass
export const loginUser = async function(req,res){
    const data = req.body
    //ricerco l'utente tramite la mail
    const user = await Profiles.findOne({email: data.email})
    
    // se non esiste l'autore, errore
    if(!user) return res.status(400).send('Unauthorized Access')

    const correctPassword = bcrypt.compareSync(data.password, user.password)
    // se pass errata, restituisco errore
    if(!correctPassword) return res.status(400).send('Unauthorized Access')
    
    // se siamo arrivati fin qui, rilascio il token jwt
    jwt.sign(
        // payload (utile per recuperare l'id dell'utente)
        {
            userId: user.id,
            userData: user
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
                jwtToken
            })
        }
    )
}

// get dei dati dell'utente
export const getUserData = async function(req,res){
    // il middleware authentication aggiunge alla req la proprietà loggedUser, che contiene i dati dell'utente individuato sul DB e corrispondente alla mail utilizzata per il login

    return res.send(req.loggedUser);
}

export const callbackGoogle = async (req,res) => {
    // passport ci crea nella richiesta un oggetto user, a cui noi possiamo poi aggiungere per esempio la proprietà token
	
    const token = req.user
    // effettuo il redirect alla home
	res.redirect(`http://localhost:5001/login?token=${token}`) // da inserire indirizzo di caricamento front-end
}