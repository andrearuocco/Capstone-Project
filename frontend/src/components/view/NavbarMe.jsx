import React, { useContext, useState } from 'react'
import { Container, Image, Modal, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { Navbar, NavDropdown } from 'react-bootstrap'
import './NavbarMe.css'
import { ProfileContext } from '../context/ProfileContextProvider'
import { Link } from 'react-router-dom'
import EmployeeRequest from '../request/EmployeeRequest'
import AdminRes from '../request/AdminRes'

function NavbarMe() {
  const [showEmployeeRequestModal, setShowEmployeeRequestModal] = useState(false)
  const [showAdminResModal, setShowAdminResModal] = useState(false)
  const { userInfo } = useContext(ProfileContext)

  const handleShowEmployeeRequestModal = () => setShowEmployeeRequestModal(true)
  const handleCloseEmployeeRequestModal = () => setShowEmployeeRequestModal(false)
  const handleShowAdminResModal = () => setShowAdminResModal(true)
  const handleCloseAdminResModal = () => setShowAdminResModal(false)

  if (!userInfo) {
    return null
  }
  return (
    <>
      <Navbar className='bg-gradient bor-nvm' bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className='align-items-baseline'>
            <Nav className="me-auto">
              <Navbar.Text className="me-3">
                <ul className='d-flex list-unstyled'>
                  <li className='ms-3'>Benvenuto {userInfo.name} {userInfo.surname}</li>
                  <ul className='d-flex list-unstyled ms-4'>
                    {userInfo.whoIs.type === 'admin' && (<li>Ruolo: {userInfo.whoIs.adminData.name}</li>)}

                    <li className='ms-3'>Birthday: {new Date(userInfo.birthday).toLocaleDateString('it-IT')}</li>
                  </ul>
                </ul>
              </Navbar.Text>
            </Nav>

            <Nav className="ms-3">
              <NavDropdown
                title={
                  <span>
                    <Image src={userInfo.avatar} roundedCircle className="he-wi me-3" /> {userInfo.name}
                  </span>
                }
                id="user-dropdown"
                align="end"
              ><div className='bg-gradient bg-opacity-25 bg-success-subtle border-succss'>
                  {userInfo.whoIs.type === 'admin' ? (
                    <>
                      <NavDropdown.Item>Cerca dipendenti per ruolo</NavDropdown.Item>
                      <NavDropdown.Item>Cerca pagamento effettuato</NavDropdown.Item>
                      <NavDropdown.Item onClick={handleShowAdminResModal}>
                        Accetta/Rifiuta richiesta di permesso
                      </NavDropdown.Item>
                      <NavDropdown.Item>Gestisci ferie</NavDropdown.Item>
                      <NavDropdown.Item>Modifica profilo</NavDropdown.Item>
                    </>
                  ) : (
                    <>
                      <NavDropdown.Item>Visualizza pagamenti ricevuti</NavDropdown.Item>
                      <NavDropdown.Item onClick={handleShowEmployeeRequestModal}>
                        Invia richiesta di permesso
                      </NavDropdown.Item>
                      <NavDropdown.Item>Gestisci ferie</NavDropdown.Item>
                      <NavDropdown.Item>Modifica profilo</NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item /* onClick={logout} */>Logout</NavDropdown.Item></div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showEmployeeRequestModal} onHide={handleCloseEmployeeRequestModal}>
        <Modal.Header closeButton>
          <Modal.Title>Richiesta Permesso/Ferie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EmployeeRequest />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEmployeeRequestModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAdminResModal} onHide={handleCloseAdminResModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Gestione Richieste Dipendenti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdminRes />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAdminResModal}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default NavbarMe;
