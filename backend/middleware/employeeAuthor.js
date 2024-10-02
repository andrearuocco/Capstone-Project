export default (req, res, next) => {
    console.log(req.loggedProfile)
    if(req.loggedProfile) {
        if(req.loggedProfile.whoIs.type === 'employee') return next()
    }
    res.status(401).send('Utente non autorizzato.')
};