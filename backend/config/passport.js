import GoogleStrategy from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import Profiles from '../models/profileSchema.js'

// creo la strategia per passport
const googleStrategy = new GoogleStrategy({
    // dati recuperati da cloud.google
    clientID: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_SECRET,
    //google callback è la rotta che verrà richiamata post ricezione token
	callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`
},
async function (accessToken, refreshToken, profile, callback) {
        
        const {given_name: name, family_name: surname, email, sub: googleId, picture: avatar} = profile._json
        
        // ricerco l'utente sul db
        let myProfile = await Profiles.findOne({googleId: googleId})
        // se non c'è lo creo
        if (!myProfile) {
            console.log('creo nuovo profilo')
            const newProfile = new Profiles({
                name, surname, email, googleId,  whoIs: {
                    type: 'employee', 
                }, avatar
            })
            myProfile = await newProfile.save()
        }

        // a prescindere, genero il jwt per l'utente
        
        jwt.sign({
            // l'userId nel token NON deve essere il googleId
            profileId: profile._id
            },
            process.env.JWT_SECRET, {
                expiresIn: '1h'
            },
            // funzione di callback
            (error, jwtToken) => {
                if(error) return res.status(500).send('Errore durante il login con google')
                
                return passportNext(null, { jwtToken })
            }
        )
    }   
)

export default googleStrategy