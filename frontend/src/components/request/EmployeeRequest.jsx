import React, { useContext, useState } from 'react';
import { Form, Modal, Button, Alert } from 'react-bootstrap';
import { employeeRequest } from '../../data/fetch';
import { ProfileContext } from '../context/ProfileContextProvider';
import Select from 'react-select';
import './EmployeeRequest.css';

const EmployeeRequest = ({ showModal, setShowModal }) => {
    const [leaveType, setLeaveType] = useState({ value: "paid", label: "Permesso Pagato" });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("success"); // per gestire il tipo di alert

    const { userInfo } = useContext(ProfileContext);
    const { name, surname } = userInfo;

    const leaveOptions = [
        { value: "paid", label: "Permesso Pagato" },
        { value: "unpaid", label: "Permesso Non Pagato" },
        { value: "holiday", label: "Ferie" }
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#e1edf3',
            padding: '10px',
            borderRadius: '5px',
            '&:hover': { borderColor: '#66cc99' },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#7d8386' : 'white',
            cursor: 'pointer',
        }),
    };

    const validateForm = () => {
        if (!leaveType || !startDate || !endDate) {
            setAlertMessage("Compila tutti i campi per inoltrare la richiesta all'amministrazione.")
            setAlertVariant("danger")
            setShowAlert(true)
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // se il form non è compliato in tutti i suoi campi allora non procedere con la costruzione dell'oggetto request
        if (!validateForm()) return;

        const request = {
            name,
            surname,
            type: leaveType.value,
            startDate,
            endDate
        }

        try {
            await employeeRequest(userInfo.whoIs.employeeData, request)
            setAlertMessage("Richiesta inviata con successo all'amministrazione!")
            setAlertVariant("success")
            setShowAlert(true)
        } catch (error) {
            setAlertMessage("La richiesta non è stata inoltrata.")
            setAlertVariant("danger")
            setShowAlert(true)
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setShowAlert(false)
    }

    return (
        <div>
            {showModal && (
                <Modal show={showModal} onHide={handleCloseModal} className="modal-search">
                    <Modal.Header closeButton>
                        <Modal.Title>Richiesta Permesso/Ferie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-gradient bg-success-subtle bg-opacity-25 br-er">
                        {showAlert && (
                            <Alert
                                className='f-wei'
                                variant={alertVariant}
                                onClose={() => setShowAlert(false)}
                                dismissible
                            >
                                {alertMessage}
                            </Alert>
                        )}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Tipo di Richiesta</Form.Label>
                                <Select
                                    className='f-wei'
                                    styles={customStyles}
                                    value={leaveType}
                                    onChange={(selectedOption) => setLeaveType(selectedOption)}
                                    options={leaveOptions}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Data di Inizio</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Data di Fine</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </Form.Group>
                            <Button className="mt-3 button-nvm-po" type="submit">
                                Invia Richiesta
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="button-nvm-po" onClick={handleCloseModal}>
                            Chiudi
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default EmployeeRequest
