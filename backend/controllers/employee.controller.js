import Employee from '../models/employeeSchema.js'

export const addEmployee = async (req, res) => {
    // crea nuova istanza del modello employee con i dati definiti nel corpo della richiesta 
    const employee = new Employee(req.body)

    try {
        await employee.save() // salva i dati nel DB

        return res.send(employee)  // mando in risposta il nuovo employee salvato 
    } catch (error) {
        return res.status(400).send(error)
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
            .populate('payEnvelope');

        const totalResults = await Employee.countDocuments(); // conta tutti i documenti employee nella collection 
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: employee,
            totalPages,
            totalResults,
            page,
        });
    } catch(err) {
        res.status(404).send();
    }
}

export const getSingleEmployee = async (req,res)=>{
    const {id} = req.params
    try {
        const employee = await Employee.findById(id).populate('payEnvelope')
        res.send(employee) 
    } catch (error) {
        res.status(404).send({message: 'Not Found'})
    }
}

export const editEmployee = async (req, res)=>{
    const {id} =req.params
    try {
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true }) // trovo il dipendente attraverso il proprio id pescato dalla richiesta e modifico i campi secondo il suo corpo
        await employee.save(); // salvo le modifiche sul DB
        res.send(employee)
    } catch (err) {
        res.status(400).send(err)
    }
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await Employee.findByIdAndDelete(id)
        res.send(`Successfully deleted employee with id ${id}.`)
    } catch (error) {
        res.status(404).send({ message: `ID ${id} not found` })
    }
}