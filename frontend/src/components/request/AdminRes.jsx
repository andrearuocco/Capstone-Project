import { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { loadRequest, patchRequest } from '../../data/fetch'

const AdminRes = () => {
  const [requests, setRequests] = useState([]);

  const handleAction = async (employeeId, requestId, action) => {
    await patchRequest(employeeId, requestId, action)
    setRequests(requests.filter(request => request._id !== requestId))
  }
  useEffect(() => {
    loadRequest().then(data => setRequests(data));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome e Cognome</th>
          {/* <th>Dipendente</th> */}
          <th>Tipo di Richiesta</th>
          <th>Data Inizio</th>
          <th>Data Fine</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request._id}>
            <td>{request.name} {request.surname}</td>
            {/* <td>{request.employee.role}</td> */}
            <td>{request.type}</td>
            <td>{new Date(request.startDate).toLocaleDateString()}</td>
            <td>{new Date(request.endDate).toLocaleDateString()}</td>
            <td>
              <Button variant="success" onClick={() => handleAction(request.employee._id, request._id, 'approved')}>Accetta</Button>
              <Button variant="danger" onClick={() => handleAction(request.employee._id, request._id, 'rejected')}>Rifiuta</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default AdminRes
