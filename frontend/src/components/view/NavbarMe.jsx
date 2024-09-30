import React, { useContext } from 'react'
import { Container, Image } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './NavbarMe.css'
import { ProfileContext } from '../context/ProfileContextProvider'

function NavbarMe() {
    const { userInfo } = useContext(ProfileContext);
  
    return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav>
            <Navbar.Text className="me-3">
              <ul className='d-flex list-unstyled'>
                <li>Benvenuto {userInfo.name} {userInfo.surname}</li>
                <ul className='d-flex list-unstyled'>
                  <li><Image src={userInfo.avatar} className='he-wi' /></li>
                  {userInfo.whoIs.type === 'admin' && (<li>Ruolo: {userInfo.whoIs.adminData.name}</li>)}
                  {userInfo.whoIs.type === 'employee' && (<li>Ruolo: {userInfo.whoIs.employeeData.role}</li>)}
                  <li>{new Date(userInfo.birthday).toLocaleDateString('it-IT')}</li>
                </ul>
              </ul>
            </Navbar.Text>
            <Nav.Link /* onClick={logout} */>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
  

export default NavbarMe;
