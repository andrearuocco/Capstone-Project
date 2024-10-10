import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Row, Col, Container, Button, Form, Table } from 'react-bootstrap/';
import { profileId, employeeId, editPay } from "../../data/fetch";
import { ProfileContext } from '../context/ProfileContextProvider';
import './SeePayments.css';

function SeePayments() {
    const [id, setId] = useState([])
    const [payments, setPayments] = useState([])
    const { userInfo } = useContext(ProfileContext)
    console.log(userInfo._id)
    const handleSee = async () => {
        await profileId(userInfo._id).then(data => {
            const employeeIdValue = data.whoIs.employeeData._id
            setId(employeeIdValue)
            return employeeIdValue
        }).then(employeeIdValue => {
            return employeeId(employeeIdValue)
        }).then(data => {
            setPayments(data.payments)
        }).catch(error => {
            console.error("Non sono riuscito a caricare i pagamenti:", error);
        })
    }
    useEffect(() => {
        if (userInfo?._id) {
            handleSee()
        }
    }, [userInfo])
    return (<>
        {payments && payments.length > 0 ? payments.map((payment, index) => (
            <><p>Pagamento {index}</p><Table striped bordered hover key={index} className="table-seep">
                <tbody>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Azienda</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.companyName || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>P. IVA</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.vatNumber || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Indirizzo</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.address?.street || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Città</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.address?.city || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>CAP</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.address?.postalCode || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.address?.province || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Paese</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.address?.country || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>IBAN</Form.Label>
                                <Form.Control type="text" value={payment.companyData?.IBAN || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Mese</Form.Label>
                                <Form.Control type="number" value={payment.payPeriod?.month || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Anno</Form.Label>
                                <Form.Control type="number" value={payment.payPeriod?.year || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Giorni Lavorati</Form.Label>
                                <Form.Control type="number" value={payment.payPeriod?.worked?.days || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Ore Lavorate</Form.Label>
                                <Form.Control type="number" value={payment.payPeriod?.worked?.hours || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Salario Base</Form.Label>
                                <Form.Control type="text" value={payment.salary?.basicSalary || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Ore di Straordinario</Form.Label>
                                <Form.Control type="number" value={payment.salary?.overtime?.hours || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Tariffa h Over</Form.Label>
                                <Form.Control type="text" value={payment.salary?.overtime?.hourlyRate || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="3">
                            <Form.Group>
                                <Form.Label>Totale straordinario</Form.Label>
                                <Form.Control type="text" value={payment.salary?.overtime?.total || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Bonus</Form.Label>
                                <Form.Control type="text" value={payment.salary?.bonus || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Altri compensi</Form.Label>
                                <Form.Control type="text" value={payment.salary?.otherFees || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Totale compensi</Form.Label>
                                <Form.Control type="text" value={payment.salary?.total || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Tasse</Form.Label>
                                <Form.Control type="text" value={payment.deductions?.taxes || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="6">
                            <Form.Group>
                                <Form.Label>Contributi Sociali</Form.Label>
                                <Form.Control type="text" value={payment.deductions?.socialContributions || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Altre Detrazioni</Form.Label>
                                <Form.Control type="text" value={payment.deductions?.otherDeductions || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Totale Detrazioni</Form.Label>
                                <Form.Control type="text" value={payment.deductions?.totalDeductions || ''} readOnly />
                            </Form.Group>
                        </td>
                        <td colSpan="4">
                            <Form.Group>
                                <Form.Label>Stipendio Netto</Form.Label>
                                <Form.Control type="text" value={payment.payCheck || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="12">
                            <Form.Group>
                                <Form.Label>Note</Form.Label>
                                <Form.Control as="textarea" value={payment.notes || ''} readOnly />
                            </Form.Group>
                        </td>
                    </tr>
                </tbody>
            </Table></> )) : <p>Loading...</p>
        }
    </>)

}

export default SeePayments