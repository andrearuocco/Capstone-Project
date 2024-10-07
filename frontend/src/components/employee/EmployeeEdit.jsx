import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Image, Modal } from 'react-bootstrap'
import { editEmployee, employeeId, profileId, editWhoIs, deleteEmployee, deleteUser } from '../../data/fetch';

const EmployeeEdit = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState({})
    const [employee, setEmployee] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [adminForm, setAdminForm] = useState(false)
    const [deleteProfile, setDeleteProfile] = useState(false)

    const [adminData, setAdminData] = useState({
        whoIs: {
            type: 'admin',
            adminData: {
                name: '',
                description: ''
            }
        }
    })

    const [formData, setFormData] = useState({
        role: '',
        paidLeave: 0,
        unpaidLeave: 0,
        holidaysYear: 20
    })

    const handleFetch = async () => {
        try {
            const PROFILE = await profileId(id) 
            setProfile(PROFILE)

            if (PROFILE?.whoIs?.employeeData?._id) {
                const EMPLOYEE = await employeeId(PROFILE.whoIs.employeeData._id)
                setEmployee(EMPLOYEE)

                setFormData({
                    role: EMPLOYEE.role || '',
                    paidLeave: EMPLOYEE.paidLeave || 0,
                    unpaidLeave: EMPLOYEE.unpaidLeave || 0,
                    holidaysYear: EMPLOYEE.holidaysYear || 20
                })

                setAdminForm({
                    type: PROFILE.whoIs.type || '',
                    adminData: {
                        name: PROFILE.whoIs.adminData.name || '',
                        description: PROFILE.whoIs.adminData.description || ''
                    }
                })
            } else {
                console.error("I dati dipendente non sono disponibili.")
            }
        } catch (error) {
            console.error("Errore nella modifica della posizione lavorativa.", error)
        }
    }

    useEffect(() => {
        handleFetch()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleAdmin = (e) => {
        const { name, value } = e.target
        setAdminData((prevData) => ({
            whoIs: {
                ...prevData.whoIs,
                adminData: {
                    ...prevData.whoIs.adminData,
                    [name]: value,
                }
            }
        }))
    }

    const handleSubmitAdmin = async (e) => {
        e.preventDefault()
        try {
            const adminForm = {
                whoIs: {
                    type: adminData.whoIs.type || '',
                    adminData: {
                        name: adminData.whoIs.adminData.name || '',
                        description: adminData.whoIs.adminData.description || ''
                    }
                }
            }
            await editWhoIs(profile._id, adminForm)
            await deleteEmployee(employee._id)

            alert("Modifiche effettuate con successo!")
        } catch (error) {
            alert("Riprova più tardi.")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            
            const employeeForm = {
                role: formData.role,
                paidLeave: formData.paidLeave,
                unpaidLeave: formData.unpaidLeave,
                holidaysYear: formData.holidaysYear,
            }
            await editEmployee(employee._id, employeeForm)

            alert("Modifiche effettuate con successo!")

        } catch (error) {
            alert("Riprova più tardi.")
        }
    }

    const handleDeleteProfile = async () => {
        
        await deleteUser(id)
        alert("Questa utenza è stata eliminata in modo definitivo.")
    }

    const handleOpenDeleteProfile = () => setDeleteProfile(true)
    const handleCloseDeleteProfile = () => setDeleteProfile(false)

    return (
        <Container>
            <Row>
                <Col sm={5} className='mt-4'>
                    <h2>Dati Utente</h2>
                    <p>Nome: {profile.name}</p>
                    <p>Cognome: {profile.surname}</p>
                    <p>Email: {profile.email}</p>
                    <p>Data di nascita: {profile.birthday}</p>
                    <p>Luogo di nascita: {profile.country}</p>
                    <p>Dati fiscali: {profile.IBAN}</p>
                    <p>Dati fiscali: {profile.TIN}</p>
                    <p>Posizione Lavorativa Attuale: {employee.role}</p>
                    <p><Image src={profile.avatar} className='image-id'></Image></p>

                    <Button variant="primary" onClick={() => setShowForm(true)}>
                        Modifica Dati Employee
                    </Button>
                    <Button variant="primary" onClick={handleOpenDeleteProfile} >
                        Elimina Utenza  
                    </Button>
                </Col>

                {showForm && (
                    <Col sm={7} className='mt-4'>
                        <h2>Modifica Posizione Lavorativa</h2>
                        <Form onSubmit={handleSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label">Ruolo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="paidLeave" className="form-label">Permessi pagati</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="paidLeave"
                                                name="paidLeave"
                                                value={formData.paidLeave}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="unpaidLeave" className="form-label">Permessi non pagati</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="unpaidLeave"
                                                name="unpaidLeave"
                                                value={formData.unpaidLeave}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="holidaysYear" className="form-label">Ferie annuali</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="holidaysYear"
                                                name="holidaysYear"
                                                value={formData.holidaysYear}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="btn btn-primary">Salva Modifiche</Button>
                                <Button variant="primary" onClick={() => setAdminForm(true)}>
                                    Promuovere ad Admin
                                </Button>
                            </div>
                        </Form>
                        {adminForm && <Form onSubmit={handleSubmitAdmin}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Ruolo nell'Azienda</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={adminData.whoIs.adminData.name}
                                                onChange={handleAdmin}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Descrizione del Ruolo</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="description"
                                                name="description"
                                                value={adminData.whoIs.adminData.description}
                                                onChange={handleAdmin}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="btn btn-primary">Trasforma in Admin</Button>
                            </div>
                        </Form>}
                    </Col>
                )}
            </Row>

            <Modal show={deleteProfile} onHide={handleCloseDeleteProfile} size="lg">
                <Modal.Header closeButton>
                    Cancellazione Profilo
                </Modal.Header>
                <Modal.Body>
                    Sicuro di voler cancellare questa utenza ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDeleteProfile}>
                        Cancella Profilo
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteProfile}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EmployeeEdit
