import GoogleStrategy from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import Profiles from '../models/profileSchema.js';
import Employee from '../models/employeeSchema.js'; // importa il modello Employee

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`
},
async function (accessToken, refreshToken, profile, passportNext) {
    const {given_name: name, family_name: surname, email, sub: googleId, picture: avatar} = profile._json;
    
    let myProfile = await Profiles.findOne({ googleId: googleId });
    
    if (!myProfile) {
        console.log('creo nuovo profilo');
        
        // Crea un nuovo documento Employee
        const newEmployee = new Employee({
            role: "Carpentiere"
        });
        const savedEmployee = await newEmployee.save();

        // Crea il profilo con riferimento a Employee
        const newProfile = new Profiles({
            name, 
            surname, 
            email, 
            googleId, 
            avatar,
            whoIs: {
                type: 'employee',
                employeeData: savedEmployee._id // referenzia l'ID dell'employee appena creato
            }
        });

        myProfile = await newProfile.save();
    }

    // Genera JWT
    jwt.sign({
        profileId: myProfile._id
    },
    process.env.JWT_SECRET, {
        expiresIn: '1h'
    },
    (error, jwtToken) => {
        if(error) return passportNext(error);
        return passportNext(null, { jwtToken });
    });
}
);

export default googleStrategy;