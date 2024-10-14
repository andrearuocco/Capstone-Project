import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { editProfile } from '../../data/fetch';
import './EditProfile.css'; 

const EditProfile = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        email: currentUser.email || '',
        password: '',
        name: currentUser.name || '',
        surname: currentUser.surname || '',
        birthday: currentUser.birthday || '',
        country: currentUser.country || '',
        IBAN: currentUser.IBAN || '',
        TIN: currentUser.TIN || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [alertMessage, setAlertMessage] = useState('')
    const [alertVariant, setAlertVariant] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const handleFormSubmit = async () => {
        setShowAlert(false)
        try {
            const EDIT = await editProfile(currentUser._id, formData)

            if (!EDIT || EDIT.error) {
                throw new Error('Profilo non modificato.')
            }

            setAlertMessage('Profilo modificato correttamente.')
            setAlertVariant('success')
            setShowAlert(true)
        } catch (error) {
            setAlertMessage('Profilo non modificato.')
            setAlertVariant('danger')
            setShowAlert(true)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFormSubmit();
    };

    return (
        <div className="bo-ra-edit"> 
            <div className="font-edit mb-4">
                <h1>Modifica Profilo</h1>
            </div>
            {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="custom-form-label">Indirizzo Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="custom-form-label">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="custom-form-label">Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="custom-form-label">Cognome</Form.Label>
                    <Form.Control
                        type="text"
                        name="surname"
                        placeholder="Cognome"
                        value={formData.surname}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="custom-form-label">Data di nascita</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="custom-form-label">Paese</Form.Label>
                    <Form.Select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Seleziona il paese di nascita</option>
                        <option value="Italia">Italia</option>
                        <option value="Francia">Francia</option>
                        <option value="Germania">Germania</option>
                        <option value="Stati Uniti">Stati Uniti</option>
                        <option value="Regno Unito">Regno Unito</option>
                        <option value="Spagna">Spagna</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="custom-form-label">IBAN</Form.Label>
                    <Form.Control
                        type="text"
                        name="IBAN"
                        placeholder="IBAN"
                        value={formData.IBAN}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label className="custom-form-label">Codice Fiscale</Form.Label>
                    <Form.Control
                        type="text"
                        name="TIN"
                        placeholder="Codice fiscale"
                        value={formData.TIN}
                        onChange={handleChange}
                        className="form-control"
                    />
                </Form.Group>

                <div className="d-flex justify-content-between flex-column flex-sm-row class-change">
                    <Button className="submit button-po-t mb-2" type="submit">
                        <span className="font-submit">Salva modifiche</span>
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default EditProfile
