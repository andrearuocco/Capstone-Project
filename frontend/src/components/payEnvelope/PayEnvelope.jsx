import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, Table } from 'react-bootstrap/';
import { profileId, employeeId } from "../../data/fetch";
import './PayEnvelope.css'

function PayEnvelope() {
    const { employeeDataId } = useParams()
    console.log(employeeDataId)
    const [profile, setProfile] = useState({})
    const [employee, setEmployee] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [paymentOne, setPaymentOne] = useState(null) // mi serve uno stato oltre quello per mostrare il form perché devo catturare con icon-pencil il pagamento da modificare
    const handlePayment = async () => {
        const EMPLOYEE = await employeeId(employeeDataId)
        setEmployee(EMPLOYEE)
        console.log(EMPLOYEE.payments)
    }
    useEffect(()=>{handlePayment()},[employeeDataId])
    return (
        <Container>
            <Row>
                <Col sm={5}>
                {/* l'operatore ?. consente di accertare la presenza dell'oggetto employee prima di accedere ai suoi campi (chaining) */}
                {employee.payments && employee.payments.map((payment, index) => (
                        <div key={index} className="pay-envelope mb-4">
                            <h4>Busta paga #{index + 1}</h4>
                            {payment.companyData?.companyName && <p><strong>Azienda:</strong> {payment.companyData.companyName}</p>}
                            {payment.companyData?.vatNumber && <p><strong>P. IVA:</strong> {payment.companyData.vatNumber}</p>}
                            {payment.companyData?.address && (
                                <p><strong>Indirizzo:</strong> 
                                    {payment.companyData.address.street || 'N/A'}, {/* valore per proprietà non obbligatorie che potrebbero riguardare dati non inseriti */} 
                                    {payment.companyData.address.city || 'N/A'}, 
                                    {payment.companyData.address.postalCode || 'N/A'}, 
                                    {payment.companyData.address.province || 'N/A'}, 
                                    {payment.companyData.address.country || 'N/A'}
                                </p>
                            )}
                            {payment.payPeriod?.month && payment.payPeriod?.year && (
                                <p><strong>Mese di lavoro:</strong> {payment.payPeriod.month}/{payment.payPeriod.year}</p>
                            )}
                            {payment.payPeriod?.worked && (
                                <>
                                    <p><strong>Giorni lavorati:</strong> {payment.payPeriod.worked.days || 'N/A'}</p>
                                    <p><strong>Ore lavorate:</strong> {payment.payPeriod.worked.hours || 'N/A'}</p>
                                </>
                            )}
                            {payment.salary?.basicSalary && <p><strong>Salario Base:</strong> {payment.salary.basicSalary} €</p>}
                            {payment.salary?.overtime && (
                                <>
                                    <p><strong>Ore di straordinario:</strong> {payment.salary.overtime.hours || '0'}</p>
                                    <p><strong>Tariffa oraria straordinario:</strong> {payment.salary.overtime.hourlyRate || 'N/A'} €</p>
                                    <p><strong>Totale straordinari:</strong> {payment.salary.overtime.total || 'N/A'} €</p>
                                </>
                            )}
                            {payment.salary?.bonus && <p><strong>Bonus:</strong> {payment.salary.bonus || 'N/A'} €</p>}
                            {payment.salary?.otherFees && <p><strong>Altri compensi:</strong> {payment.salary.otherFees || 'N/A'} €</p>}
                            {payment.salary?.total && <p><strong>Totale compensi:</strong> {payment.salary.total} €</p>}
                            {payment.deductions && (
                                <>
                                    <p><strong>Imposte:</strong> {payment.deductions.taxes || 'N/A'} €</p>
                                    <p><strong>Contributi sociali:</strong> {payment.deductions.socialContributions || 'N/A'} €</p>
                                    {payment.deductions.otherDeductions && <p><strong>Altre detrazioni:</strong> {payment.deductions.otherDeductions || 'N/A'} €</p>}
                                    <p><strong>Totale detrazioni:</strong> {payment.deductions.totalDeductions || 'N/A'} €</p>
                                </>
                            )}
                            {payment.payCheck && <p><strong>Stipendio netto:</strong> {payment.payCheck} €</p>}
                            {payment.notes && <p><strong>Note:</strong> {payment.notes}</p>}
                            <p><i className="fa-solid fa-pencil font-s" onClick={() => { setShowForm(true); setPaymentOne(payment) }} ></i><i className="fa-solid fa-trash font-s"></i></p>
                        </div>
                    ))}
                </Col>
                <Col sm={7}>
                {showForm && paymentOne && (
                        <Form>
                            <h4>Modifica Busta Paga</h4>

                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Azienda</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.companyName || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>P. IVA</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.vatNumber || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Indirizzo</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.address?.street || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Città</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.address?.city || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>CAP</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.address?.postalCode || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Provincia</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.address?.province || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Paese</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.address?.country || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>IBAN</Form.Label>
                                                <Form.Control type="text" value={paymentOne.companyData?.IBAN || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Mese</Form.Label>
                                                <Form.Control type="number" value={paymentOne.payPeriod?.month || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Anno</Form.Label>
                                                <Form.Control type="number" value={paymentOne.payPeriod?.year || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Giorni Lavorati</Form.Label>
                                                <Form.Control type="number" value={paymentOne.payPeriod?.worked?.days || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Ore Lavorate</Form.Label>
                                                <Form.Control type="number" value={paymentOne.payPeriod?.worked?.hours || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Salario Base</Form.Label>
                                                <Form.Control type="text" value={paymentOne.salary?.basicSalary || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Ore di Straordinario</Form.Label>
                                                <Form.Control type="number" value={paymentOne.salary?.overtime?.hours || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Tariffa h straordinario</Form.Label>
                                                <Form.Control type="text" value={paymentOne.salary?.overtime?.hourlyRate || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Totale straordinario</Form.Label>
                                                <Form.Control type="text" value={paymentOne.salary?.overtime?.total || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Bonus</Form.Label>
                                                <Form.Control type="text" value={paymentOne.salary?.bonus || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Altri compensi</Form.Label>
                                                <Form.Control type="text" value={paymentOne.salary?.otherFees || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Totale compensi</Form.Label>
                                                <Form.Control type="text" value={paymentOne.salary?.total || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Tasse</Form.Label>
                                                <Form.Control type="text" value={paymentOne.deductions?.taxes || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Contributi Sociali</Form.Label>
                                                <Form.Control type="text" value={paymentOne.deductions?.socialContributions || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Altre Detrazioni</Form.Label>
                                                <Form.Control type="text" value={paymentOne.deductions?.otherDeductions || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Totale Detrazioni</Form.Label>
                                                <Form.Control type="text" value={paymentOne.deductions?.totalDeductions || ''} />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Stipendio Netto</Form.Label>
                                                <Form.Control type="text" value={paymentOne.payCheck || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="12">
                                            <Form.Group>
                                                <Form.Label>Note</Form.Label>
                                                <Form.Control as="textarea" value={paymentOne.notes || ''} />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Button variant="primary" onClick={() => setShowForm(false)}>Salva Modifiche</Button>
                            <Button variant="secondary" onClick={() => setShowForm(false)} className="ml-2">Annulla</Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default PayEnvelope
