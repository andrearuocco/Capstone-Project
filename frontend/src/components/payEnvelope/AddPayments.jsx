import React, { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import { addPay } from '../../data/fetch';

const AddPayments = ({ profile, employee }) => {
    const [formData, setFormData] = useState({
        companyData: {
            companyName: '',
            vatNumber: '',
            address: {
                street: '',
                city: '',
                postalCode: '',
                province: '',
                country: ''
            },
            IBAN: ''
        },
        payPeriod: {
            month: '',
            year: '',
            worked: {
                days: '',
                hours: ''
            }
        },
        salary: {
            basicSalary: '',
            overtime: {
                hours: '',
                hourlyRate: '',
                total: ''
            },
            bonus: '',
            otherFees: '',
            total: ''
        },
        deductions: {
            taxes: '',
            socialContributions: '',
            otherDeductions: '',
            totalDeductions: ''
        },
        payCheck: '',
        notes: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        const keys = name.split('.')
        
        if (keys.length === 1) {
            setFormData({
                ...formData,
                [keys[0]]: value
            });
        } else if (keys.length === 2) {
            setFormData({
                ...formData,
                [keys[0]]: {
                    ...formData[keys[0]],
                    [keys[1]]: value
                }
            });
        } else if (keys.length === 3) {
            setFormData({
                ...formData,
                [keys[0]]: {
                    ...formData[keys[0]],
                    [keys[1]]: {
                        ...formData[keys[0]][keys[1]],
                        [keys[2]]: value
                    }
                }
            })
        }
    }

    const onSubmit = async () => {
        await addPay(profile, employee, formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
        alert("Pagamento aggiunto con successo.")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Table striped bordered hover>
                <tbody>

                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Azienda</Form.Label>
                                <Form.Control type="text" value={formData.companyData.companyName} onChange={handleInputChange} name="companyData.companyName" />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>P. IVA</Form.Label>
                                <Form.Control type="text" value={formData.companyData.vatNumber} onChange={handleInputChange} name="companyData.vatNumber" />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Indirizzo</Form.Label>
                                <Form.Control type="text" value={formData.companyData.address.street} onChange={handleInputChange} name="companyData.address.street" />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Città</Form.Label>
                                <Form.Control type="text" value={formData.companyData.address.city} onChange={handleInputChange} name="companyData.address.city" />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>CAP</Form.Label>
                                <Form.Control type="text" value={formData.companyData.address.postalCode} onChange={handleInputChange} name="companyData.address.postalCode" />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control type="text" value={formData.companyData.address.province} onChange={handleInputChange} name="companyData.address.province" />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Paese</Form.Label>
                                <Form.Control type="text" value={formData.companyData.address.country} onChange={handleInputChange} name="companyData.address.country" />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>IBAN</Form.Label>
                                <Form.Control type="text" value={formData.companyData.IBAN} onChange={handleInputChange} name="companyData.IBAN" />
                            </Form.Group>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Mese</Form.Label>
                                <Form.Control type="number" value={formData.payPeriod.month} onChange={handleInputChange} name="payPeriod.month" />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Anno</Form.Label>
                                <Form.Control type="number" value={formData.payPeriod.year} onChange={handleInputChange} name="payPeriod.year" />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Giorni Lavorati</Form.Label>
                                <Form.Control type="number" value={formData.payPeriod.worked.days} onChange={handleInputChange} name="payPeriod.worked.days" />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Ore Lavorate</Form.Label>
                                <Form.Control type="number" value={formData.payPeriod.worked.hours} onChange={handleInputChange} name="payPeriod.worked.hours" />
                            </Form.Group>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Salario Base</Form.Label>
                                <Form.Control type="text" value={formData.salary.basicSalary} onChange={handleInputChange} name="salary.basicSalary" />
                            </Form.Group>
                        </td>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Ore di Straordinario</Form.Label>
                                <Form.Control type="number" value={formData.salary.overtime.hours} onChange={handleInputChange} name="salary.overtime.hours" />
                            </Form.Group>
                        </td>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Tariffa h Over</Form.Label>
                                <Form.Control type="text" value={formData.salary.overtime.hourlyRate} onChange={handleInputChange} name="salary.overtime.hourlyRate" />
                            </Form.Group>
                        </td>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Totale straordinario</Form.Label>
                                <Form.Control type="text" value={formData.salary.overtime.total} onChange={handleInputChange} name="salary.overtime.total" />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Bonus</Form.Label>
                                <Form.Control type="text" value={formData.salary.bonus} onChange={handleInputChange} name="salary.bonus" />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Altri compensi</Form.Label>
                                <Form.Control type="text" value={formData.salary.otherFees} onChange={handleInputChange} name="salary.otherFees" />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Totale compensi</Form.Label>
                                <Form.Control type="text" value={formData.salary.total} onChange={handleInputChange} name="salary.total" />
                            </Form.Group>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Tasse</Form.Label>
                                <Form.Control type="text" value={formData.deductions.taxes} onChange={handleInputChange} name="deductions.taxes" />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Contributi Sociali</Form.Label>
                                <Form.Control type="text" value={formData.deductions.socialContributions} onChange={handleInputChange} name="deductions.socialContributions" />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Altre Detrazioni</Form.Label>
                                <Form.Control type="text" value={formData.deductions.otherDeductions} onChange={handleInputChange} name="deductions.otherDeductions" />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Totale Detrazioni</Form.Label>
                                <Form.Control type="text" value={formData.deductions.totalDeductions} onChange={handleInputChange} name="deductions.totalDeductions" />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Stipendio Netto</Form.Label>
                                <Form.Control type="text" value={formData.payCheck} onChange={handleInputChange} name="payCheck" />
                            </Form.Group>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="12">
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Form.Control as="textarea" value={formData.notes} onChange={handleInputChange} name="notes" />
                            </Form.Group>
                        </td>
                    </tr>

                </tbody>
            </Table>
            <Button variant="primary" type="submit">
                Aggiungi Busta Paga
            </Button>
        </Form>
    )
}

export default AddPayments
