import {Card, Col, Button, Offcanvas } from 'react-bootstrap/'
import './ProfileOne.css'
import { useState } from 'react';

const offcanvasConfig = {
  name: 'ProfileDetails',
  scroll: true,
  backdrop: true,
};

function ProfileOne({profile}) {
    console.log(profile) 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (<Col xs={12} sm={6} md={4} lg={3} className="my-3">
        <Card /* style={{ width: '18rem' }} */ >
            <Card.Img variant="top" src={profile.avatar} style={{ height: '18rem' }} />
            <Card.Body>
                <Card.Title>{profile.name} {profile.surname} {` - ${profile.whoIs.type}`}</Card.Title>
                <Card.Text>
                    {profile.whoIs.type === 'admin' && (
                        <ul className='list-unstyled'>
                            <li>Role: {profile.whoIs.adminData.name}</li>
                            <li className='overF'>Description: {profile.whoIs.adminData.description}</li>
                        </ul>
                    )}
                    {profile.whoIs.type === 'employee' && (
                        <ul className='list-unstyled'>
                            <li>Role: {profile.whoIs.employeeData.role}</li>

                            {profile.whoIs.employeeData.dailyTask.length > 0 && (
                                <li className='overF'>
                                    dailyTask: 
                                    {profile.whoIs.employeeData.dailyTask[profile.whoIs.employeeData.dailyTask.length - 1].description} {/* mostro solo il task assegnato più di recente */}
                                    {profile.whoIs.employeeData.dailyTask[profile.whoIs.employeeData.dailyTask.length - 1].day}
                                </li>
                            )}
                        </ul>
                    )}
                </Card.Text>
                <>
                    <Button variant="primary" onClick={toggleShow} className="me-2">
                        {offcanvasConfig.name}
                    </Button>
                    <Offcanvas show={show} onHide={handleClose} scroll={offcanvasConfig.scroll} backdrop={offcanvasConfig.backdrop}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Profile Details</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul>
                                <li><Card.Img variant="top" src={profile.avatar} style={{ height: '12rem' }} /></li>
                                <li>{profile.name} {profile.surname }</li>
                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            </Card.Body>
        </Card>
    </Col>)
}

export default ProfileOne