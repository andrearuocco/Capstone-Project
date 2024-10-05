import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'


const EmployeeRequest = () => {
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  const submitLeaveRequest = (requestData) => {
    
    console.log('Richiesta inviata:', requestData)
    handleCloseModal()
  }

  const [leaveType, setLeaveType] = useState("paid");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    const request = {
      type: leaveType,
      startDate,
      endDate
    }
    submitLeaveRequest(request)
  }

    return (
        <div>
            <h1>Dashboard Dipendente</h1>
            <button onClick={handleOpenModal}>Richiedi Permesso/Ferie</button>

            {/*       
      <LeaveRequestModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        submitRequest={submitLeaveRequest} 
      /> */}

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
