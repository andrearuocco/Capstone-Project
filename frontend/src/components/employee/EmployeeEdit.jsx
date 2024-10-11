import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image, Modal } from 'react-bootstrap'
import { editEmployee, employeeId, profileId, editWhoIs, deleteEmployee, deleteUser } from '../../data/fetch';
import './EmployeeEdit.css';
import { Alert } from 'react-bootstrap';
import 'animate.css';
import { ThemeContext } from '../context/ThemeContextProvider';

const EmployeeEdit = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState({})
    const [employee, setEmployee] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [adminForm, setAdminForm] = useState(false)
    const [deleteProfile, setDeleteProfile] = useState(false)
    const {theme, toggleTheme} = useContext (ThemeContext)

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

    const [alertMessage, setAlertMessage] = useState('')
    const [alertVariant, setAlertVariant] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()

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
        const { name, value } = e.target;
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
        e.preventDefault();
        try {
            const adminForm = {
                whoIs: {
                    type: adminData.whoIs.type || '',
                    adminData: {
                        name: adminData.whoIs.adminData.name || '',
                        description: adminData.whoIs.adminData.description || ''
                    }
                }
            };
            const EDITWI = await editWhoIs(profile._id, adminForm)
            await deleteEmployee(employee._id)

            if (!EDITWI || EDITWI.error) {
                throw new Error('Profilo non modificato.')
            }

            setAlertMessage("Modifiche effettuate con successo!")
            setAlertVariant("warning")
            setShowAlert(true)
            navigate('/')
        } catch (error) {
            setAlertMessage("Riprova più tardi.")
            setAlertVariant("danger")
            setShowAlert(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const employeeForm = {
                role: formData.role,
                paidLeave: formData.paidLeave,
                unpaidLeave: formData.unpaidLeave,
                holidaysYear: formData.holidaysYear,
            };
            const EDITE = await editEmployee(employee._id, employeeForm)

            if (!EDITE || EDITE.error) {
                throw new Error('Profilo non modificato.')
            }
    
            setAlertMessage("Modifiche effettuate con successo!")
            setAlertVariant("warning")
            setShowAlert(true)
            navigate('/')
        } catch (error) {
            setAlertMessage("Riprova più tardi.")
            setAlertVariant("danger")
            setShowAlert(true)
        }
    }

    const handleDeleteProfile = async () => {
        await deleteUser(id)
        setAlertMessage("Questa utenza è stata eliminata in modo definitivo.")
        setAlertVariant("warning")
        setShowAlert(true)
        navigate('/')
    }

    const handleOpenDeleteProfile = () => setDeleteProfile(true)
    const handleCloseDeleteProfile = () => setDeleteProfile(false)

    return (<>
        <Container className={theme === 'light' ? 'bg-nvm br-eme' : 'br-eme bg-gradient bg-dark bg-opacity-10'}>
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <Row>
                <Col sm={5} className="mt-4 modal-search">
                    <div className="card-emplo-edit shadow-sm p-4">
                        <h2 className="mb-4 text-primary">Dati Utente</h2>
                        <div className="user-info mb-4">
                            <p><strong>Nome:</strong> {profile.name}</p>
                            <p><strong>Cognome:</strong> {profile.surname}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Data di nascita:</strong> {profile.birthday}</p>
                            <p><strong>Luogo di nascita:</strong> {profile.country}</p>
                            <p><strong>Dati fiscali (IBAN):</strong> {profile.IBAN}</p>
                            <p><strong>Dati fiscali (TIN):</strong> {profile.TIN}</p>
                            <p><strong>Posizione Lavorativa Attuale:</strong> {employee.role}</p>
                        </div>
                        <Image src={profile.avatar} className="image-id mb-4" />
                        <div className="d-flex justify-content-between">
                            <Button
                                variant="primary"
                                className="button-nvm-po shadow-sm"
                                onClick={() => setShowForm(true)}
                            >
                                Modifica Dati Employee
                            </Button>
                            <Button
                                variant="danger"
                                className="button-nvm-po shadow-sm"
                                onClick={handleOpenDeleteProfile}
                            >
                                Elimina Utenza
                            </Button>
                        </div>
                    </div>
                </Col>

                {showForm && (
                    <Col sm={7} className='mt-4 animate__animated animate__fadeInRight modal-search'>
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
                                <div className='d-flex'><Button type="submit" className="button-nvm-po me-2">Salva Modifiche</Button>
                                    <Button className="button-nvm-po" onClick={() => setAdminForm(true)}>
                                        Promuovere ad Admin
                                    </Button></div>
                            </div>
                        </Form>
                        {adminForm && <Form onSubmit={handleSubmitAdmin}>
                            <div className="container animate__animated animate__fadeInRight">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Ruolo nell'Azienda</label>
                                            <Form.Select
                                                id="name"
                                                name="name"
                                                value={adminData.whoIs.adminData.name}
                                                onChange={handleAdmin}
                                                required
                                            >
                                                <option value="">Seleziona il nuovo ruolo</option>
                                                <option value="Socio">Socio</option>
                                                <option value="Amministratore Delegato">Amministratore Delegato</option>
                                                <option value="Direttore Tecnico">Direttore Tecnico</option>
                                                <option value="Direttore Finanziario">Direttore Finanziario</option>
                                                <option value="Responsabile">Responsabile</option>
                                                <option value="Direttore Operativo">Direttore Operativo</option>
                                                <option value="Responsabile Risorse Umane">Responsabile Risorse Umane</option>
                                                <option value="Responsabile Vendite">Responsabile Vendite</option>
                                            </Form.Select>
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
                                <Button type="submit" className="button-nvm-po">Trasforma in Admin</Button>
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
        <footer className='footer-eme br-40 sticky-bottom d-flex justify-content-around align-items-center bg-success-subtle'>
            <strong className='footer-text'>
                Nuove soluzioni per la gestione e l'amministrazione della tua impresa.
            </strong>
            <Button onClick={() => {toggleTheme()}} className='ms-3 button-nvm-po'>Set Theme</Button>
        </footer></>
    )
}

export default EmployeeEdit
