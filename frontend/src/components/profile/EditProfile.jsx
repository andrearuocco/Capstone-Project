import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { editProfile } from '../../data/fetch';

const EditProfile = ({currentUser}) => {
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
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
    const handleFormSubmit = async () => {
        await editProfile(currentUser._id, formData)
        alert("Profilo modificato correttamente")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleFormSubmit()
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Indirizzo Email</Form.Label>
                <Form.Control 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control 
                    type="text"
                    name="surname"
                    placeholder="Cognome"
                    value={formData.surname}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control 
                    type="date"
                    name="birthday"
                    placeholder="Data di nascita"
                    value={formData.birthday}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Place</Form.Label>
                <Form.Select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
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
                <Form.Label>Dati fiscali</Form.Label>
                <Form.Control 
                    type="text"
                    name="IBAN"
                    placeholder="IBAN"
                    value={formData.IBAN}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Dati fiscali</Form.Label>
                <Form.Control 
                    type="text"
                    name="TIN"
                    placeholder="Codice fiscale"
                    value={formData.TIN}
                    onChange={handleChange}
                />
            </Form.Group>

            <div className="d-flex justify-content-between flex-column flex-sm-row">
                <Button className="bg-white submit text-primary mb-2 ms-2" type="submit">
                    <span className="font-submit">Salva modifiche</span>
                </Button>
            </div>
        </Form>
    )
}

export default EditProfile
