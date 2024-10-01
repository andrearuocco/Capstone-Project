import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button, Form } from 'react-bootstrap/'
import './EmployeeEdit.css'
import { employeeId, editEmployee, editWhoIs } from "../../data/fetch"

function EmployeeEdit({ profile }) {
    const { id } = useParams() // prendo id dalla richiesta 
    const [prof, setProf] = useState(profile.find(p => p._id === id)) // cerco il profilo corrispondente a quello della richiesta per mostrare i suoi dati 
    const [employee, setEmployee] = useState({}) // creo uno stato perché avrò bisogno del doc. employee corrisponde a quello del profile cercato
    const [isEditing, setIsEditing] = useState(false) // sto modificando oppure no 

    // mi servirà uno stato per la modifica eventuale di whoIs nel caso in cui il dipendente fosse promosso ad admin
    const [formValue, setFormValue] = useState({
        type: prof.whoIs.type || '', 
        name: prof.whoIs.adminData?.name || '', 
        description: prof.whoIs.adminData?.description || ''
    })
    // questo è lo stato per la modifica della posizione lavorativa 
    const [employeeForm, setEmployeeForm] = useState({
        role: employee.role || '' 
    })

    useEffect(() => {
        if (prof) {
            employeeId(prof.whoIs.employeeData._id).then(data => setEmployee(data));
        }
    }, [prof]);

    const handleEditClick = () => {
        setIsEditing(!isEditing) // gestione modalità di modifica
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'type' || name === 'name' || name === 'description') {
            setFormValue(prev => ({ ...prev, [name]: value })) // mostra i valori precedenti e cattura l'evento di inserimento dati da parte dell'utente
        } else if (name === 'role') {
            setEmployeeForm(prev => ({ ...prev, [name]: value }))
        }
    }

    const handleSubmit = async () => {
        const updatedWhoIs = { type: formValue.type } // questo aggiorna l'oggetto whoIs
        // se viene selezionato admin aggiungiamo i dati admin 
        if (formValue.type === 'admin') {
            updatedWhoIs.adminData = {}
            if (formValue.name) {
                updatedWhoIs.adminData.name = formValue.name
            }
            if (formValue.description) {
                updatedWhoIs.adminData.description = formValue.description
            }
        }
        // passo alle fetch i parametri necessari 
        const employeeRes = await editEmployee(prof.whoIs.employeeData._id, employeeForm)
        const whoIsRes = await editWhoIs(prof._id, formValue)

        if (employeeRes && whoIsRes) {
            alert(`Hai modificato correttamente ${prof.name} ${prof.surname}.`)
            setIsEditing(false)
        } else {
            alert('Errore nelle modifiche.');
        }
    }

    return (
        <Container>
            <Row>
                <Col sm={5} className="d-flex flex-column align-items-center">
                    <ul className="list-unstyled mt-4">
                        <li>{prof.name}</li>
                        <li>{prof.surname}</li>
                        <li>{prof.email}</li>
                        <li>{new Date(prof.birthday).toLocaleDateString('it-IT')}</li>
                        <li>
                            <Card.Img variant="top" className='border-200 me-3' src={prof.avatar} />
                        </li>
                        <li>{prof.country}</li>
                        <li>{prof.IBAN}</li>
                        <li>{prof.whoIs.type}</li>
                    </ul>
                </Col>
                <Col sm={7}>
                    {isEditing ? (
                        <Form className="mt-4">

                            <Form.Group className="mb-3">
                                <Form.Label>WhoIs Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="type"
                                    value={formValue.type}
                                    onChange={handleChange}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </Form.Control>
                            </Form.Group>

                            {formValue.type === 'admin' && (
                                <>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Admin Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formValue.name}
                                            onChange={handleChange}
                                            placeholder="Promuovere ad Admin"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Admin Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="description"
                                            value={formValue.description}
                                            onChange={handleChange}
                                            placeholder="Promuovere ad Admin"
                                        />
                                    </Form.Group>
                                </>
                            )}

                            <Form.Group className="mb-3">
                                <Form.Label>Employee Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="role"
                                    value={employeeForm.role}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={handleSubmit}>
                                Modifica Utenza
                            </Button>
                        </Form>

                    ) : (
                        <div>
                            <p className="mt-4"><strong>Ruolo:</strong> {employee.role}</p>
                            <Button variant="secondary" onClick={handleEditClick}>
                                Modifica whoIs Modifica Role
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default EmployeeEdit
