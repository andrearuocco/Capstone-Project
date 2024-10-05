import { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { loadRequest, responseFeHo } from '../../data/fetch'

const AdminRes = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        await loadRequest().then(data => setRequests(data))

      } catch (error) {
        console.error('Questa richiesta non esiste.', error)
      }
    };
    fetchRequests()
  }, [])

  const handleAction = async (requestId, action) => {
    try {
      await responseFeHo(requestId, action )
      setRequests(requests.filter(request => request._id !== requestId))
    } catch (error) {
      console.error('Richiesta non gestita correttamente', error)
    }
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Dipendente</th>
          <th>Tipo di Richiesta</th>
          <th>Data Inizio</th>
          <th>Data Fine</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(request => (
          <tr key={request._id}>
            <td>{request.employee.role}</td>
            <td>{request.type}</td>
            <td>{new Date(request.startDate).toLocaleDateString()}</td>
            <td>{new Date(request.endDate).toLocaleDateString()}</td>
            <td>
              <Button variant="success" onClick={() => handleAction(request._id, 'approved')}>Accetta</Button>
              <Button variant="danger" onClick={() => handleAction(request._id, 'rejected')}>Rifiuta</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default AdminRes
