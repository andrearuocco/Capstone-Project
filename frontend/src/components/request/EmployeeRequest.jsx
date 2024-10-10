import React, { useContext, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { employeeRequest } from '../../data/fetch'
import { ProfileContext } from '../context/ProfileContextProvider'

const EmployeeRequest = ({showModal, setShowModal}) => {
    /* const [showModal, setShowModal] = useState(false); */
    const [leaveType, setLeaveType] = useState("paid");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    /* const handleOpenModal = () => setShowModal(true); */
    const handleCloseModal = () => setShowModal(false);

    const { userInfo } = useContext(ProfileContext)
    console.log(userInfo.whoIs.employeeData)
    const {name, surname} = userInfo

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            // recupero name e surname da userInfo in modo che sia rintracciato e visibile lato admin chi ha inviato la richiesta 
            name,
            surname,
            type: leaveType,
            startDate,
            endDate
        }
        await employeeRequest(userInfo.whoIs.employeeData, request)
        handleCloseModal()
    }

    return (
        <div>
{/*         <h1>Dashboard Dipendente</h1>
            <button onClick={handleOpenModal}>Richiedi Permesso/Ferie</button> */}

            {showModal && <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Richiesta Permesso/Ferie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Tipo di Richiesta</Form.Label>
                            <Form.Control as="select" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                <option value="paid">Permesso Pagato</option>
                                <option value="unpaid">Permesso Non Pagato</option>
                                <option value="holiday">Ferie</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data di Inizio</Form.Label>
                            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data di Fine</Form.Label>
                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Invia Richiesta</Button>
                    </Form>
                </Modal.Body>
            </Modal>}
        </div>
    )
}

export default EmployeeRequest
