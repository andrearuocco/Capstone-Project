import React, { useContext, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { employeeRequest } from '../../data/fetch'
import { ProfileContext } from '../context/ProfileContextProvider'
import './EmployeeRequest.css'
import Select from 'react-select'

const EmployeeRequest = ({showModal, setShowModal}) => {
    /* const [showModal, setShowModal] = useState(false); */
    const [leaveType, setLeaveType] = useState({ value: "paid", label: "Permesso Pagato" });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    /* const handleOpenModal = () => setShowModal(true); */
    const handleCloseModal = () => setShowModal(false);

    const { userInfo } = useContext(ProfileContext)
    console.log(userInfo.whoIs.employeeData)
    const {name, surname} = userInfo

    const leaveOptions = [
        { value: "paid", label: "Permesso Pagato" },
        { value: "unpaid", label: "Permesso Non Pagato" },
        { value: "holiday", label: "Ferie" }
    ]

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#e1edf3',
            /* borderColor: state.isFocused ? '#66cc99' : '#46b4df', */
            padding: '10px',
            borderRadius: '5px',
            /* boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null, */
            '&:hover': {
                borderColor: '#66cc99',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#7d8386' : 'white', 
            /* color: state.isFocused ? 'white' : '#495057',
            padding: '10px', */
            cursor: 'pointer',
        }),
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            // recupero name e surname da userInfo in modo che sia rintracciato e visibile lato admin chi ha inviato la richiesta 
            name,
            surname,
            type: leaveType.value,
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

            {showModal && <Modal show={showModal} onHide={handleCloseModal} className='modal-search'>
                <Modal.Header closeButton>
                    <Modal.Title>Richiesta Permesso/Ferie</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-gradient bg-success-subtle bg-opacity-25 br-er'> 
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Tipo di Richiesta</Form.Label>
{/*                             <Form.Control as="select" className="custom-select" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} >
                                <option value="paid">Permesso Pagato</option>
                                <option value="unpaid">Permesso Non Pagato</option>
                                <option value="holiday">Ferie</option>
                            </Form.Control> */}
                            <Select
                                styles={customStyles}
                                value={leaveType}
                                onChange={(selectedOption) => setLeaveType(selectedOption)}
                                options={leaveOptions}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data di Inizio</Form.Label>
                            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data di Fine</Form.Label>
                            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Form.Group>
                        <Button className='mt-3 button-nvm-po' type="submit">Invia Richiesta</Button>
                    </Form>
                </Modal.Body>
            </Modal>}
        </div>
    )
}

export default EmployeeRequest
