import React, { useContext, useState } from 'react'
import { Container, Image, Modal, Button, Form, Alert } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { Navbar, NavDropdown } from 'react-bootstrap'
import './NavbarMe.css'
import { ProfileContext } from '../context/ProfileContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import EmployeeRequest from '../request/EmployeeRequest'
import AdminRes from '../request/AdminRes'
import SeePayments from '../payEnvelope/SeePayments'
import EditProfile from '../profile/EditProfile'
import { getPaySearch, patchProfile } from '../../data/fetch'
import { ThemeContext } from '../context/ThemeContextProvider'

function NavbarMe() {
  /* const [showEmployeeRequestModal, setShowEmployeeRequestModal] = useState(false) */
  const [showAdminResModal, setShowAdminResModal] = useState(false)
  const [showPayModal, setShowPayModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [avatar, setAvatar] = useState(false)
  const [adminSearch, setAdminSearch] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [searchMonth, setSearchMonth] = useState('')
  const [searchYear, setSearchYear] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const {token, setToken, userInfo, setUserInfo} = useContext(ProfileContext)
  const {theme, toggleTheme} = useContext (ThemeContext)
  const [showModal, setShowModal] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

/*const handleShowEmployeeRequestModal = () => setShowEmployeeRequestModal(true)
  const handleCloseEmployeeRequestModal = () => setShowEmployeeRequestModal(false) */
  const handleShowAdminResModal = () => setShowAdminResModal(true)
  const handleCloseAdminResModal = () => setShowAdminResModal(false)
  const handleOpenShowPayModal = () => setShowPayModal(true)
  const handleCloseShowPayModal = () => setShowPayModal(false)
  const handleOpenEditModal = () => setEditModal(true)
  const handleCloseEditModal = () => setEditModal(false)
  const handleOpenAvatar = () => setAvatar(true)
  const handleCloseAvatar = () => setAvatar(false)
  const handleOpenAdminSearch = () => setAdminSearch(true)
  const handleCloseAdminSearch = () => setAdminSearch(false)

  const handleOpenModal = () => setShowModal(true)

  const handlePatch = async () => {
    if (!selectedAvatar) {
      setAlertMessage("Inserisci un nuovo file per procedere.")
      setShowAlert(true)
      return
    }

    const formData = new FormData()
    formData.append('avatar', selectedAvatar)

    const response = await patchProfile(userInfo._id, formData)
    setAlertMessage("Avatar aggiornato con successo!")
    setShowAlert(true)
    handleCloseAvatar()
  }

  const handleSearch = async () => {
    await getPaySearch(searchMonth, searchYear).then(data => setSearchResults(data.dati))
  }

  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const handleShowLogoutModal = () => setShowLogoutModal(true)
  const handleCloseLogoutModal = () => setShowLogoutModal(false)
  const handleLogout = () => {
    setToken(null)
    setUserInfo(null)
    localStorage.removeItem('token')
    handleCloseLogoutModal()
    navigate('/')
  }
  
  if (!userInfo) {
    return null
  }
  return (
    <>
      <Navbar className={theme === 'light' ? 'bg-nvm bor-nvm custom-navbar' : 'bg-gradient bg-black bg-opacity-10 bor-nvm custom-navbar'} expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Navbar.Text className="me-3 align-items-center">
                <ul className='d-flex list-unstyled ul-nvm'>
                  <li className='ms-3'>Benvenuta/o {userInfo.name} {userInfo.surname}</li>
                  <ul className='d-flex list-unstyled ms-4'>
                    {userInfo.whoIs.type === 'admin' && (<li>Ruolo: {userInfo.whoIs.adminData.name}</li>)}
                    <li className='ms-3'>Birthday: {new Date(userInfo.birthday).toLocaleDateString('it-IT')}</li>
                    <li><Button onClick={handleOpenAvatar} className='ms-3 button-nvm-po'>Aggiorna Avatar</Button></li>
                    <li><Button onClick={() => {toggleTheme()}} className='ms-3 button-nvm-po'>Set Theme</Button></li>
                  </ul>
                </ul>
              </Navbar.Text>
            </Nav>

            <Nav className="ul-nvm">
              <NavDropdown
                title={
                  <span>
                    <Image src={userInfo.avatar} roundedCircle className="he-wi me-3" /> {userInfo.name}
                  </span>
                }
                id="user-dropdown"
                align="end"
              ><div className='border-succss'>
                  {userInfo.whoIs.type === 'admin' ? (
                    <>
                      <NavDropdown.Item onClick={handleOpenAdminSearch}>Cerca pagamento effettuato</NavDropdown.Item>
                      <NavDropdown.Item onClick={handleShowAdminResModal}>
                        Accetta/Rifiuta richiesta di permesso
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleOpenEditModal}>Modifica profilo</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item onClick={handleOpenShowPayModal}>Visualizza pagamenti ricevuti</NavDropdown.Item>
                      <NavDropdown.Item onClick={handleOpenModal}>
                        Invia richiesta di permesso
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleOpenEditModal}>Modifica profilo</NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleShowLogoutModal}>Logout</NavDropdown.Item></div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* modale per invio richiesta gg di permesso - ferie lato dipendente */}
      {showModal && 
        <EmployeeRequest setShowModal={setShowModal} showModal={showModal} />
      }
      <Modal show={showAdminResModal} onHide={handleCloseAdminResModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='modal-search'>Gestione Richieste Dipendenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminRes />
        </Modal.Body>
        <Modal.Footer>
          <Button className='button-nvm-po' onClick={handleCloseAdminResModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPayModal} onHide={handleCloseShowPayModal} size="lg" className="modal-search">
        <Modal.Header closeButton>
          <Modal.Title>Payments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SeePayments />
        </Modal.Body>
        <Modal.Footer>
          <Button className='button-nvm-po' onClick={handleCloseShowPayModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='modal-search'>{userInfo.name} {userInfo.surname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile currentUser={userInfo} />
        </Modal.Body>
        <Modal.Footer>
          <Button className='button-nvm-po' onClick={handleCloseEditModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={avatar} onHide={handleCloseAvatar} size="lg" className='modal-search'>
        <Modal.Header closeButton className='d-flex'>
          <Modal.Title className='me-2'>Modifica Avatar</Modal.Title>
          {showAlert && (
            <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Inserisci un file per caricare un nuovo avatar</Form.Label>
            <Form.Control type="file" onChange={(e) => setSelectedAvatar(e.target.files[0])} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className='button-nvm-po' onClick={handlePatch}>
            Aggiorna
          </Button>
          <Button className='button-nvm-po' onClick={handleCloseAvatar}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cerca un pagamento effettuato dall'azienda secondo il mese e l'anno */}
      <Modal show={adminSearch} onHide={handleCloseAdminSearch} size="lg" className='modal-search'>
        <Modal.Header closeButton>
          <Modal.Title>Cerca pagamenti</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-gradient bg-black bg-opacity-10'>
          <Form>
            <Form.Group controlId="searchMonth">
              <Form.Label>Mese Pagamento</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il mese"
                value={searchMonth}
                onChange={(e) => setSearchMonth(e.target.value)} 
              />
            </Form.Group>
            <Form.Group controlId="searchYear" className="mt-3">
              <Form.Label>Anno Pagamento</Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci l'anno"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)} 
              />
            </Form.Group>
          </Form>
          
          {searchResults.length > 0 && (
            <div className="mt-4">
              <h5>Documenti trovati: {searchResults.length}</h5>
              <ul className='list-unstyled'>
                {searchResults.map((result, index) => (
                  <li key={index} className='d-flex flex-column bg-nvm p-3 br-search mb-2'><span className='text-white text-opacity-50'>Risultato</span>
                    
                    <p className='text-black-50'><strong className='text-white text-opacity-50'>ID:</strong> {result._id} <strong className='text-white text-opacity-50'>Nome:</strong> {result.companyData.companyName}</p>
                    <p className='text-black-50'><strong className='text-white text-opacity-50'>PIVA:</strong> {result.companyData.vatNumber} <strong className='text-white text-opacity-50'>IBAN:</strong> {result.companyData.IBAN}</p>
                    <p className='text-black-50'><strong className='text-white text-opacity-50'>gg Lavoro:</strong> {result.payPeriod.worked.days} <strong className='text-white text-opacity-50'>Base Salario:</strong> {result.salary.basicSalary}€</p>
                    <p className='text-black-50'><strong className='text-white text-opacity-50'>Straordinario:</strong> {result.salary.overtime.total}€ <strong className='text-white text-opacity-50'>Totale Emesso:</strong> {result.payCheck}€</p>
                    
                  </li>
                ))}
              </ul>
            </div>
          )}

        </Modal.Body>
        <Modal.Footer>
          <Button className='button-nvm-po' onClick={handleSearch}>
            Cerca
          </Button>
          <Button className='button-nvm-po' onClick={handleCloseAdminSearch}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} size="lg">
        <Modal.Body className='modal-search'>
          Sei sicuro di voler uscire dal tuo account ?
        </Modal.Body>
        <Modal.Footer>
          <Button className='button-nvm-po' onClick={handleLogout}>
            Logout
          </Button>
          <Button className='button-nvm-po' onClick={handleCloseLogoutModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


export default NavbarMe
