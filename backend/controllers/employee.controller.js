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