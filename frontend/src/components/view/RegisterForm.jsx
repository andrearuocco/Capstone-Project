import { React, useState } from "react"
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerProfile } from "../../data/fetch";
import './RegisterForm.css';

function RegisterForm({ showForm, setShowForm }) {
    
    // stato per gestire i dati di registrazione
    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        birthday: '',
        country: '',
        IBAN: '',
        TIN: '',
        whoIs: {
            type: 'admin',
            adminData: {
                name: '',
                description: ''
            }
        }
    })
    const [licenseKey, setLicenseKey] = useState('') // per monitorare lo stato della licenza dell'applicazione
    const [licenseError, setLicenseError] = useState(false) // per gestire evenuali errori sull'inserimento della licenza 

    // funzione per gestire le variazioni di stato su inserimento dati dell'utente
    const handleFormChange = (event) => {
        const { name, value } = event.target;

        // per i campi presenti nell'oggetto whoIs (una delle chiavi del form)
        if (name.startsWith("whoIs.adminData.")) {
            const key = name.split("whoIs.adminData.")[1]
            setRegisterFormData((prevData) => ({
                ...prevData,
                whoIs: {
                    ...prevData.whoIs,
                    adminData: {
                        ...prevData.whoIs.adminData,
                        [key]: value,
                    },
                },
            }))
        } else {
            // per gli altri campi di livello superiore
            setRegisterFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

    const handleLicenseChange = (event) => {
        setLicenseKey(event.target.value)
    } // catturo l'inserimento dati nel campo che riguarda la licenza 

    // funzione per mostrare il login form
    const showLoginForm = function () {
        setShowForm(false)
    }

    // funzione per creare il nuovo utente
    const createNewProfile = async function () {
        if (licenseKey !== "licenzaAndrea") { // verifica se la chiave di rilascio dell'applicazione è corretta
            setLicenseError(true) // licenza key non valida
            return
        }
        console.log(registerFormData)
        const createdProfile = await registerProfile(registerFormData)
        alert('Registrazione avvenuta con successo.')
        showLoginForm()
    }

    return (
        <div className="bg-gradient bg-success-subtle bo-ra-register">
            <div className="font-register m-1">
                <h1>Register Form</h1>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Licenza Applicazione</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci licenza rilasciata per uso applicazione"
                            value={licenseKey}
                            onChange={handleLicenseChange}
                        />
                        {licenseError && <p className="text-danger">Chiave di licenza non valida</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Indirizzo Email</Form.Label>
                        <Form.Control type="email"
                            name="email"
                            placeholder="Email"
                            value={registerFormData.email}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            name="password"
                            placeholder="Password"
                            value={registerFormData.password}
                            onChange={handleFormChange}
                            required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text"
                            name="name"
                            placeholder="Nome"
                            value={registerFormData.name}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text"
                            name="surname"
                            placeholder="Cognome"
                            value={registerFormData.surname}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control type="date"
                            name="birthday"
                            placeholder="Quando sei nato"
                            value={registerFormData.birthday}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Place</Form.Label>
                        <Form.Select type="text"
                            name="country"
                            value={registerFormData.country}
                            onChange={handleFormChange}
                        >
                        <option value="">Seleziona il paese di nascita</option>
                        <option value="Italia">Italia</option>
                        <option value="Francia">Francia</option>
                        <option value="Germania">Germania</option>
                        <option value="Stati Uniti">Stati Uniti</option>
                        <option value="Regno Unito">Regno Unito</option>
                        <option value="Spagna">Spagna</option></Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dati fiscali</Form.Label>
                        <Form.Control type="text"
                            name="IBAN"
                            placeholder="IBAN"
                            value={registerFormData.IBAN}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dati fiscali</Form.Label>
                        <Form.Control type="text"
                            name="TIN"
                            placeholder="Codice fiscale"
                            value={registerFormData.TIN}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Ruolo</Form.Label>
                        <Form.Select 
                            name="whoIs.adminData.name"
                            value={registerFormData.whoIs.adminData.name}
                            onChange={handleFormChange}
                        >
                        <option value="">Seleziona il tuo ruolo</option>
                        <option value="Socio">Socio</option>
                        <option value="Amministratore Delegato">Amministratore Delegato</option>
                        <option value="Direttore Tecnico">Direttore Tecnico</option>
                        <option value="Direttore Finanziario">Direttore Finanziario</option>
                        <option value="Responsabile">Responsabile</option>
                        <option value="Direttore Operativo">Direttore Operativo</option>
                        <option value="Responsabile Risorse Umane">Responsabile Risorse Umane</option>
                        <option value="Responsabile Vendite">Responsabile Vendite</option></Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control type="text"
                            name="whoIs.adminData.description"
                            placeholder="Descrizione della tua posizione"
                            value={registerFormData.whoIs.adminData.description}
                            onChange={handleFormChange}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between flex-column flex-sm-row">
                        <Button className="bg-white submit text-primary mb-2 ms-2" onClick={createNewProfile}>
                            <span className="font-submit">Submit</span>
                        </Button>
                        <Link variant="secondary" onClick={showLoginForm}
                            as="Button"
                            className="">
                            Already have an account? Click Here!
                        </Link>
                    </div>
                </Form>
            </div>
        </div>

    );
}

export default RegisterForm;