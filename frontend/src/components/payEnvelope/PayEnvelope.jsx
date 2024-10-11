import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, Table, Modal } from 'react-bootstrap/';
import { profileId, employeeId, editPay, deletePayEnvelope } from "../../data/fetch";
import './PayEnvelope.css';
import AddPayments from "./AddPayments";

function PayEnvelope(/* {profiles} */) {
    const { employeeDataId } = useParams()
    const { id } = useParams()
    console.log(employeeDataId)
    const [profile, setProfile] = useState({}) 
    const handleOpenAddPay = () => setAddPay(true)
    const handleCloseAddPay = () => setAddPay(false)
    const [employee, setEmployee] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [addPay, setAddPay] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [paymentOne, setPaymentOne] = useState(null) // mi serve uno stato oltre quello per mostrare il form perché devo catturare con icon-pencil il pagamento da modificare
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
    const handlePayment = async () => {
        const EMPLOYEE = await employeeId(employeeDataId)
        setEmployee(EMPLOYEE)
        console.log(EMPLOYEE.payments)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target
        const nameParts = name.split('.')
    
        setFormData((prevFormData) => {
            let newFormData = { ...prevFormData }
            let nextObject = newFormData
    
            for (let i = 0; i < nameParts.length - 1; i++) {
                const part = nameParts[i];
                
                if (!nextObject[part]) {
                    nextObject[part] = {}
                }
                nextObject = nextObject[part]
            }
    
            nextObject[nameParts[nameParts.length - 1]] = value
            return newFormData
        })
    }
    const handleFormSubmit = async () => {
        const payEnvelopeId = paymentOne?._id; // con l'operatore ?. mi accerto che lo paymentOne sia correttamente riempito 
        const response = await editPay(employeeDataId, payEnvelopeId, formData)
        if (!response.error) {
            
            setShowForm(false)
            handlePayment()
        } else {
            console.error(response.error)
        }
    }
    useEffect(()=>{handlePayment()},[employeeDataId])
    useEffect(() => { if (paymentOne) setFormData(paymentOne) }, [paymentOne]) // controllo che i campi del form siano popolati con i valori già inseriti 
    useEffect(() => {handleProfile()}, [])

    const handleProfile = async () => {
        await profileId(id).then(data => setProfile(data))
    }

    const handleOpenDeleteModal = (payment) => {
        setPaymentOne(payment)
        setDeleteModal(true)
    }
    const handleCloseDeleteModal = () => setDeleteModal(false)

    const handleDelete = async () => {
        if (paymentOne) {
            console.log(paymentOne)
            await deletePayEnvelope(employeeDataId, paymentOne._id)
            handleCloseDeleteModal()
            handlePayment()
        } else {
            console.error("Non è stato possibile cancellare questo documento di pagamento.")
        }
    }
    return (<>
        <Container className="modal-search">
            <div className="d-flex justify-content-around mt-3"><h1>Situazione fiscale: {profile.name} {profile.surname}</h1><Button onClick={handleOpenAddPay}>Aggiungi Busta Paga</Button></div>
            <Row>
                <Col sm={5}>
                    {/* l'operatore ?. consente di accertare la presenza dell'oggetto employee prima di accedere ai suoi campi (chaining) */}
                    {employee.payments && employee.payments.map((payment, index) => (
                        <div key={index} className="pay-envelope mb-4">
                            <h4>Busta paga #{index + 1}</h4>
                            <div className="pay-envelope-grid">
                                {payment.companyData?.companyName && <p className="overF"><strong>Azienda:</strong> {payment.companyData.companyName}</p>}
                                {payment.companyData?.vatNumber && <p className="overF"><strong>P. IVA:</strong> {payment.companyData.vatNumber}</p>}

                                {payment.companyData?.address && (
                                    <p className="overF"><strong>Indirizzo:</strong>
                                        {payment.companyData.address.street || 'N/A'},
                                        {payment.companyData.address.city || 'N/A'},
                                        {payment.companyData.address.postalCode || 'N/A'},
                                        {payment.companyData.address.province || 'N/A'},
                                        {payment.companyData.address.country || 'N/A'}
                                    </p>
                                )}

                                {payment.payPeriod?.month && payment.payPeriod?.year && (
                                    <p className="overF"><strong>Mese di lavoro:</strong> {payment.payPeriod.month}/{payment.payPeriod.year}</p>
                                )}
                                {payment.payPeriod?.worked && (
                                    <>
                                        <p className="overF"><strong>Giorni lavorati:</strong> {payment.payPeriod.worked.days || 'N/A'}</p>
                                        <p className="overF"><strong>Ore lavorate:</strong> {payment.payPeriod.worked.hours || 'N/A'}</p>
                                    </>
                                )}

                                {payment.salary?.basicSalary && <p><strong>Salario Base:</strong> {payment.salary.basicSalary} €</p>}
                                {payment.salary?.overtime && (
                                    <>
                                        <p className="overF"><strong>Ore di straordinario:</strong> {payment.salary.overtime.hours || '0'}</p>
                                        <p className="overF"><strong>Tariffa oraria straordinario:</strong> {payment.salary.overtime.hourlyRate || 'N/A'} €</p>
                                        <p className="overF"><strong>Totale straordinari:</strong> {payment.salary.overtime.total || 'N/A'} €</p>
                                    </>
                                )}
                                {payment.salary?.bonus && <p className="overF"><strong>Bonus:</strong> {payment.salary.bonus || 'N/A'} €</p>}
                                {payment.salary?.otherFees && <p className="overF"><strong>Altri compensi:</strong> {payment.salary.otherFees || 'N/A'} €</p>}
                                {payment.salary?.total && <p className="overF"><strong>Totale compensi:</strong> {payment.salary.total} €</p>}

                                {payment.deductions && (
                                    <>
                                        <p className="overF"><strong>Imposte:</strong> {payment.deductions.taxes || 'N/A'} €</p>
                                        <p className="overF"><strong>Contributi sociali:</strong> {payment.deductions.socialContributions || 'N/A'} €</p>
                                        {payment.deductions.otherDeductions && <p className="overF"><strong>Altre detrazioni:</strong> {payment.deductions.otherDeductions || 'N/A'} €</p>}
                                        <p className="overF"><strong>Totale detrazioni:</strong> {payment.deductions.totalDeductions || 'N/A'} €</p>
                                    </>
                                )}
                                {payment.payCheck && <p className="overF"><strong>Stipendio netto:</strong> {payment.payCheck} €</p>}
                                {payment.notes && <p className="overF"><strong>Note:</strong> {payment.notes}</p>}
                            </div>

                            <p className="mt-3">
                                <i className="me-3 fa-solid fa-pencil font-s" onClick={() => { setShowForm(true); setPaymentOne(payment) }} ></i>
                                <i className="fa-solid fa-trash font-s" onClick={() => handleOpenDeleteModal(payment)}></i>
                            </p>
                        </div>
                    ))}
                </Col>
                <Col sm={7}>
                    {showForm && paymentOne && (
                        <Form className="sticky-top">
                            <h4>Modifica Busta Paga</h4>

                            <Table striped bordered hover>
                                <tbody>
                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Azienda</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.companyName || ''} onChange={handleInputChange} name="companyData.companyName" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>P. IVA</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.vatNumber || ''} onChange={handleInputChange} name="companyData.vatNumber" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Indirizzo</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.address?.street || ''} onChange={handleInputChange} name="companyData.address.street" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Città</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.address?.city || ''} onChange={handleInputChange} name="companyData.address.city" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>CAP</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.address?.postalCode || ''} onChange={handleInputChange} name="companyData.address.postalCode" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Provincia</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.address?.province || ''} onChange={handleInputChange} name="companyData.address.province" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Paese</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.address?.country || ''} onChange={handleInputChange} name="companyData.address.country" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>IBAN</Form.Label>
                                                <Form.Control type="text" value={formData.companyData?.IBAN || ''} onChange={handleInputChange} name="companyData.IBAN" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Mese</Form.Label>
                                                <Form.Control type="number" value={formData.payPeriod?.month || ''} onChange={handleInputChange} name="payPeriod.month" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Anno</Form.Label>
                                                <Form.Control type="number" value={formData.payPeriod?.year || ''} onChange={handleInputChange} name="payPeriod.year" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Giorni Lavorati</Form.Label>
                                                <Form.Control type="number" value={formData.payPeriod?.worked?.days || ''} onChange={handleInputChange} name="payPeriod.worked.days" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Ore Lavorate</Form.Label>
                                                <Form.Control type="number" value={formData.payPeriod?.worked?.hours || ''} onChange={handleInputChange} name="payPeriod.worked.hours" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Salario Base</Form.Label>
                                                <Form.Control type="text" value={formData.salary?.basicSalary || ''} onChange={handleInputChange} name="salary.basicSalary" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Ore di Straordinario</Form.Label>
                                                <Form.Control type="number" value={formData.salary?.overtime?.hours || ''} onChange={handleInputChange} name="salary.overtime.hours" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Tariffa h Over</Form.Label>
                                                <Form.Control type="text" value={formData.salary?.overtime?.hourlyRate || ''} onChange={handleInputChange} name="salary.overtime.hourlyRate" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="3">
                                            <Form.Group>
                                                <Form.Label>Totale straordinario</Form.Label>
                                                <Form.Control type="text" value={formData.salary?.overtime?.total || ''} onChange={handleInputChange} name="salary.overtime.total" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Bonus</Form.Label>
                                                <Form.Control type="text" value={formData.salary?.bonus || ''} onChange={handleInputChange} name="salary.bonus" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Altri compensi</Form.Label>
                                                <Form.Control type="text" value={formData.salary?.otherFees || ''} onChange={handleInputChange} name="salary.otherFees" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Totale compensi</Form.Label>
                                                <Form.Control type="text" value={formData.salary?.total || ''} onChange={handleInputChange} name="salary.total" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Tasse</Form.Label>
                                                <Form.Control type="text" value={formData.deductions?.taxes || ''} onChange={handleInputChange} name="deductions.taxes" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="6">
                                            <Form.Group>
                                                <Form.Label>Contributi Sociali</Form.Label>
                                                <Form.Control type="text" value={formData.deductions?.socialContributions || ''} onChange={handleInputChange} name="deductions.socialContributions" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Altre Detrazioni</Form.Label>
                                                <Form.Control type="text" value={formData.deductions?.otherDeductions || ''} onChange={handleInputChange} name="deductions.otherDeductions" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Totale Detrazioni</Form.Label>
                                                <Form.Control type="text" value={formData.deductions?.totalDeductions || ''} onChange={handleInputChange} name="deductions.totalDeductions" />
                                            </Form.Group>
                                        </td>
                                        <td colSpan="4">
                                            <Form.Group>
                                                <Form.Label>Stipendio Netto</Form.Label>
                                                <Form.Control type="text" value={formData.payCheck || ''} onChange={handleInputChange} name="payCheck" />
                                            </Form.Group>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan="12">
                                            <Form.Group>
                                                <Form.Label>Note</Form.Label>
                                                <Form.Control as="textarea" value={formData.notes || ''} onChange={handleInputChange} name="notes" />
                                            </Form.Group>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <Button variant="primary" onClick={handleFormSubmit}>Salva Modifiche</Button>
                            <Button variant="secondary" onClick={() => setShowForm(false)} className="ml-2">Annulla</Button>
                        </Form>
                    )}
                </Col>
            </Row>
        </Container>

        <Modal show={addPay} onHide={handleCloseAddPay} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Payments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddPayments profile={id} employee={employeeDataId} /> 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddPay}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={deleteModal} onHide={handleCloseDeleteModal} size="lg">
            <Modal.Header closeButton>
               Cancellazione Pagamento
            </Modal.Header>
            <Modal.Body>
                Sicuro di voler cancellare questo documento ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDelete}>
                    Cancella Pagamento
                </Button>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default PayEnvelope
