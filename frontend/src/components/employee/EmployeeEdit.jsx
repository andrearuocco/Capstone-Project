import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { editEmployee, employeeId, profileId, editWhoIs } from '../../data/fetch';

const EmployeeEdit = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState({})
  const [employee, setEmployee] = useState({})
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ // formData per campi inseriti dall'utente 
    role: '',
    whoIs: 'employee',
    adminName: '',
    adminDescription: '',
    paidLeave: 0,
    unpaidLeave: 0,
    holidaysYear: 20
  })
  const [isAdmin, setIsAdmin] = useState(false) // l'utente sta per essere promosso ad admin oppure no 

  const handleFetch = async () => {
    try {
        const PROFILE = await profileId(id);
        setProfile(PROFILE)
    
        if (PROFILE?.whoIs?.employeeData?._id) { // vediamo se effettivamente PROFILE è valorizzato e non utilizziamo lo stato che al refresh potrebbe essere vuoto
          const EMPLOYEE = await employeeId(PROFILE.whoIs.employeeData._id)
          setEmployee(EMPLOYEE)
    
          setFormData({
            role: EMPLOYEE.role || '',
            whoIs: PROFILE.whoIs.type || 'employee',
            adminName: PROFILE.whoIs.type === 'admin' ? PROFILE.whoIs.adminData?.name || '' : '',
            adminDescription: PROFILE.whoIs.type === 'admin' ? PROFILE.whoIs.adminData?.description || '' : '',
            paidLeave: EMPLOYEE.paidLeave || 0,
            unpaidLeave: EMPLOYEE.unpaidLeave || 0,
            holidaysYear: EMPLOYEE.holidaysYear || 20
          })
    
          setIsAdmin(PROFILE.whoIs.type === 'admin')
        } else {
          console.error("I dati dipendente non sono disponibili.");
        }
      } catch (error) {
        console.error("Errore nella modifica di whoIs-profile e posizione lavorativa.", error);
      }
  }

  useEffect(() => {
    handleFetch()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    if (name === 'whoIs') {
      setIsAdmin(value === 'admin');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // oggetto da inviare per l'aggiornamento dell'employee
      const employeeForm = {
        role: formData.role,
        paidLeave: formData.paidLeave,
        unpaidLeave: formData.unpaidLeave,
        holidaysYear: formData.holidaysYear
      }
  
      // aggiorna employee 
      const employeeRes = await editEmployee(employee._id, employeeForm)
  
      // oggetto da inviare per l'aggiornamento del whoIs 
      const whoIsForm = {
        type: formData.whoIs,
        ...(formData.whoIs === 'admin' && {
          name: formData.adminName,
          description: formData.adminDescription
        })
      }
  
      // aggiorna il whoIs 
      const whoIsRes = await editWhoIs(id, whoIsForm)
  
      alert("Modifiche effettuate !")
  
    } catch (error) {
    
      alert("Riprova più tardi.");
    }
  }

  return(<Container>
        <Row>
            <Col sm={5} className='mt-4'>      
                <h2>Dati Utente</h2>
                <p>Nome: {profile.name}</p>
                <p>Email: {profile.email}</p>

                <Button variant="primary" onClick={() => setShowForm(true)}>
                    Modifica Dati
                </Button>
            </Col>
            <Col sm={7} className='mt-4'>
              <h2>Modifica Posizione Lavorativa</h2>
              <Form onSubmit={handleSubmit}>
                  <div className="container">
                      <div className="row">
                          <div className="col-md-6">
                              {/* Campi per i dati dell'employee */}
                              <div className="mb-3">
                                  <label htmlFor="role" className="form-label">Ruolo</label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      id="role"
                                      name="role"
                                      value={formData.role}
                                      onChange={handleChange}
                                      required
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="paidLeave" className="form-label">Permessi pagati</label>
                                  <input
                                      type="number"
                                      className="form-control"
                                      id="paidLeave"
                                      name="paidLeave"
                                      value={formData.paidLeave}
                                      onChange={handleChange}
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="unpaidLeave" className="form-label">Permessi non pagati</label>
                                  <input
                                      type="number"
                                      className="form-control"
                                      id="unpaidLeave"
                                      name="unpaidLeave"
                                      value={formData.unpaidLeave}
                                      onChange={handleChange}
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="holidaysYear" className="form-label">Ferie annuali</label>
                                  <input
                                      type="number"
                                      className="form-control"
                                      id="holidaysYear"
                                      name="holidaysYear"
                                      value={formData.holidaysYear}
                                      onChange={handleChange}
                                  />
                              </div>
                          </div>

                          <div className="col-md-6">
                              {/* Campi visibili solo se il profilo è admin */}
                              <div className="mb-3">
                                  <label htmlFor="whoIs" className="form-label">Tipo Utente</label>
                                  <select
                                      id="whoIs"
                                      name="whoIs"
                                      className="form-select"
                                      value={formData.whoIs}
                                      onChange={handleChange}
                                  >
                                      <option value="employee">Dipendente</option>
                                      <option value="admin">Amministratore</option>
                                  </select>
                              </div>
                              {isAdmin && (
                                  <>
                                      <div className="mb-3">
                                          <label htmlFor="adminName" className="form-label">Ruolo Amministratore</label>
                                          <input
                                              type="text"
                                              className="form-control"
                                              id="adminName"
                                              name="adminName"
                                              value={formData.adminName}
                                              onChange={handleChange}
                                          />
                                      </div>
                                      <div className="mb-3">
                                          <label htmlFor="adminDescription" className="form-label">Descrizione</label>
                                          <textarea
                                              className="form-control"
                                              id="adminDescription"
                                              name="adminDescription"
                                              value={formData.adminDescription}
                                              onChange={handleChange}
                                          />
                                      </div>
                                  </>
                              )}
                          </div>
                      </div>
                      <Button type="submit" className="btn btn-primary">Salva Modifiche</Button>
                  </div>
              </Form>
            </Col>
        </Row>
    </Container>)
}

export default EmployeeEdit