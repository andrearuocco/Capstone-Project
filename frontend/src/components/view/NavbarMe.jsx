import React, { useContext } from 'react'
import { Container, Image } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './NavbarMe.css'
import { ProfileContext } from '../context/ProfileContextProvider'

function NavbarMe() {
    const { me, logout } = useContext(ProfileContext);
  
    if (!me) {
      return null
    }
  
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav>
            <Navbar.Text className="me-3">
              <ul className='d-flex list-unstyled'>
                <li>Benvenuto {me.name} {me.surname}</li>
                <ul className='d-flex list-unstyled'>
                  <li><Image src={me.avatar} className='he-wi' /></li>
                  {me.whoIs.type === 'admin' && (<li>Ruolo: {me.whoIs.adminData.name}</li>)}
                  {me.whoIs.type === 'employee' && (<li>Ruolo: {me.whoIs.employeeData.role}</li>)}
                  <li>{new Date(me.birthday).toLocaleDateString('it-IT')}</li>
                </ul>
              </ul>
            </Navbar.Text>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
  

export default NavbarMe;
