import GoogleStrategy from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import Profiles from '../models/profileSchema.js';
/* import Employees from '../models/employeeSchema.js'; */ // importa il modello Employee

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`
},
    async function (accessToken, refreshToken, profile, passportNext) {
        const { given_name: name, family_name: surname, email, sub: googleId, picture: avatar } = profile._json;

        let myProfile = await Profiles.findOne({ googleId });

        if (!myProfile) {
            console.log('Creo nuovo profilo.');

            // crea il profilo riferito al nuovo Employee
            const newProfile = new Profiles({
                name,
                surname,
                email,
                googleId,
                avatar,
                IBAN: "000000000000000000000000000",
                TIN: "0000000000000000",
                country: "Italia"
            });

            myProfile = await newProfile.save();
        }

        // genera JWT
        jwt.sign({
            profileId: myProfile._id
        },
            process.env.JWT_SECRET, {
            expiresIn: '1h'
        },
            (error, jwtToken) => {
                if (error) return passportNext(error);
                return passportNext(null, { jwtToken });
            });
    }
);

export default googleStrategy;