import jwt from 'jsonwebtoken';
import Profiles from '../models/profileSchema.js';

export default (req, res, next) => {
    console.log(req.loggedProfile)
    if(req.loggedProfile) {
        if(req.loggedProfile.whoIs.type === 'admin') return next()
    }
    res.status(401).send('Utente non autorizzato.')


};