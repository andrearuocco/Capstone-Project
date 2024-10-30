import Admin from './models/adminSchema'
import Employee from './models/employeeSchema'

export const authorize = (requiredRole) => async (req, res, next) => {
    try {
        const profileId = req.user._id

        // cerca tra i documenti Admin ed Employee attraverso l'id del profile
        const isAdmin = await Admin.exists({ profile: profileId })
        const isEmployee = await Employee.exists({ profile: profileId })

        let role;
        if (isAdmin) {
            role = 'admin'
        } else if (isEmployee) {
            role = 'employee'
        } else {
            role = 'generic'
        }

        // controlla se il ruolo richiesto coincide con quello trovato o se è `admin`
        if (role !== requiredRole && !(role === 'admin' && requiredRole === 'employee')) {
            return res.status(403).send({ message: 'Accesso non autorizzato.' })
        }

        next()
    } catch (error) {
        res.status(500).send({ message: 'Riprova più tardi.', error: error.message })
    }
}
