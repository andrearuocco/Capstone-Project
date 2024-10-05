import React, { useContext } from 'react'
import { Container, Image } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import {Navbar, NavDropdown} from 'react-bootstrap'
import './NavbarMe.css'
import { ProfileContext } from '../context/ProfileContextProvider'
import { Link } from 'react-router-dom'

function NavbarMe() {
    const { userInfo } = useContext(ProfileContext);
    if (!userInfo) {
      return null
    }
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className='align-items-baseline'>
            <Nav className="me-auto">
              <Navbar.Text className="me-3">
                <ul className='d-flex list-unstyled'>
                  <li className='ms-3'>Benvenuto {userInfo.name} {userInfo.surname}</li>
                  <ul className='d-flex list-unstyled ms-4'>
                    {userInfo.whoIs.type === 'admin' && (<li>Ruolo: {userInfo.whoIs.adminData.name}</li>)}
                    {/* {userInfo.whoIs.type === 'employee' && (<li>Ruolo: {userInfo.whoIs.employeeData.role}</li>)} */}
                    <li className='ms-3'>Birthday: {new Date(userInfo.birthday).toLocaleDateString('it-IT')}</li>
                  </ul>
                </ul>
              </Navbar.Text>
            </Nav>

            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <span>
                    <Image src={userInfo.avatar} roundedCircle className="he-wi me-3" /> {userInfo.name}
                  </span>
                }
                id="user-dropdown"
                align="end"
              >
                {userInfo.whoIs.type === 'admin' ? (
                  <>
                    <NavDropdown.Item>Cerca dipendenti per ruolo</NavDropdown.Item>
                    <NavDropdown.Item>Cerca pagamento effettuato</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={'/admin/requests'}>Accetta richiesta di permesso</NavDropdown.Item>
                    <NavDropdown.Item>Gestisci ferie</NavDropdown.Item>
                    <NavDropdown.Item>Modifica profilo</NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item>Visualizza pagamenti ricevuti</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={'/employee/leave-request'}>Invia richiesta di permesso</NavDropdown.Item>
                    <NavDropdown.Item>Gestisci ferie</NavDropdown.Item>
                    <NavDropdown.Item>Modifica profilo</NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item /* onClick={logout} */>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  

export default NavbarMe;
