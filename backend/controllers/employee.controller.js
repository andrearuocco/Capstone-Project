import Employee from '../models/employeeSchema.js'
import { calculateAverageRating } from '../services/calculate.js'

export const addEmployee = async (req, res) => {
    const { profileId } = req.params
    const employeeData = { ...req.body, profile: profileId }

    try {
        
        const employee = new Employee(employeeData) // crea un nuovo documento employee con i dati del corpo della richiesta

        await employee.save()

        const updatedProfile = await Employee.findById(employee._id).populate('profile')

        return res.status(201).send({ updatedProfile })

    } catch (error) {
        return res.status(400).send({ message: "Utenza profilo esistente non aggiornata con i dati dipendente", error })
    }
}

export const getAllEmployee = async (req,res) => {
    try {
        const page = req.query.page || 1;
        let perPage = req.query.perPage || 4;
        perPage = perPage > 6 ? 4 : perPage  // se l'utente richiede più di 6 employees su una pagina saranno mostrati 4 employees come di default

        const employee = await Employee.find(req.query.role ? {role: {$regex: req.query.role, $options: 'i'}} : {}) // ricerca per ruolo del dipendente
            .sort({ holidaysYear:-1, paidLeave:-1, reliabilityRates:-1 })  // ordino gli oggetti JSON in ordine decrescente secondo rates, permessi e ferie 
            .skip((page - 1) * perPage) // salto documenti pagina precedente 
            .limit(perPage) // indico gli elementi da mostrare per pagina
            .populate({
                path: 'payments',  
                model: 'payEnvelope',
            })
            .populate({
                path: 'profile', 
                model: 'Profile',
            });

        const totalResults = await Employee.countDocuments(); // conta tutti i documenti employee nella collection 
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: employee,
            totalPages,
            totalResults,
            page,
        })
    } catch(err) {
        res.status(404).send()
    }
}

export const getSingleEmployee = async (req,res)=>{
    const {id} = req.params
    try {
        const employee = await Employee.findById(id).populate({
            path: 'payments',  
            model: 'payEnvelope',
        })
        .populate({
            path: 'profile', 
            model: 'Profile',
        });
        res.send(employee) 
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }
}

export const editEmployee = async (req, res)=>{
    const {id} =req.params
    try {
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true }) // trovo il dipendente attraverso il proprio id pescato dalla richiesta e modifico i campi secondo il suo corpo
        await employee.save() // salvo le modifiche sul DB
        res.send(employee)
    } catch (err) {
        res.status(400).send(err)
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params

    try {
        // verifica che il dipendente esista
        const employee = await Employee.findById(id)

        if (!employee) {
            return res.status(404).send({ message: 'Employee non trovato' })
        }

        // elimina employee
        await Employee.findByIdAndDelete(id)

        res.status(200).send({ message: 'Employee eliminato con successo' })
    } catch (error) {
        res.status(500).send({ message: 'Riprova più tardi.', error: error.message })
    }
}

export const rateEmployee = async (req, res) => {
    const { rating } = req.body
    const employeeId = req.params.id

    try {
        const employee = await Employee.findById(employeeId)

        employee.ratings.push(rating)
        employee.reliabilityRates = calculateAverageRating(employee.ratings)
        await employee.save()
        
        res.status(200).send(employee)
    } catch (error) {
        res.status(500).send('Riprova più tardi.', error)
    }
}
