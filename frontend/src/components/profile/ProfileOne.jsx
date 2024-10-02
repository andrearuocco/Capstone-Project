import { Card, Col, Button, Offcanvas } from 'react-bootstrap/'
import './ProfileOne.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const offcanvasConfig = {
    name: 'ProfileDetails',
    scroll: true,
    backdrop: true,
};

function ProfileOne({ profile }) {
    console.log(profile)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (<Col xs={12} sm={6} md={4} lg={3} className="my-3">
        <Card /* style={{ width: '18rem' }} */ >
            <Card.Img variant="top" src={profile.avatar} style={{ height: '18rem' }} />
            <Card.Body>
                <Card.Title className='overF'>{profile.name} {profile.surname} {` - ${profile.whoIs.type}`}</Card.Title>
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

                            <li className='overF'>dailyTask:{profile.whoIs.employeeData.dailyTask.length > 0 && (
                                <span>
                                    {profile.whoIs.employeeData.dailyTask[profile.whoIs.employeeData.dailyTask.length - 1].description} {/* mostro solo il task assegnato più di recente */}
                                    {profile.whoIs.employeeData.dailyTask[profile.whoIs.employeeData.dailyTask.length - 1].day}
                                </span>
                            )}</li>
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
                            <ul className='list-unstyled'>
                                <li className='d-flex justify-content-between align-items-center mb-4'>
                                    <Card.Img variant="top" className='border-50 me-3' src={profile.avatar} />
                                    <div>{profile.name} {profile.surname}</div>
                                    <div>{profile.whoIs.type === 'admin' && (
                                        <ul className='list-unstyled'>
                                            <li>Role: {profile.whoIs.adminData.name}</li>
                                        </ul>
                                    )}
                                    {profile.whoIs.type === 'employee' && (
                                        <ul className='list-unstyled'>
                                            <li>Role: {profile.whoIs.employeeData.role}</li>
                                        </ul>
                                    )}</div>
                                </li>
                                <li className='mb-4'>Email: {profile.email}</li>
                                <li className='mb-4'>Birthday: {new Date(profile.birthday).toLocaleDateString('it-IT')}</li>
                                <li className='mb-4'>Country: {profile.country}</li>
                                <li className='mb-4'>IBAN: {profile.IBAN}</li>
                                <li className='mb-4'>TIN: {profile.TIN}</li>
                                {profile.whoIs.type === 'employee' && (
                                    <> {profile.whoIs.employeeData.dailyTask.map((dT, index) => <div>dailyTask{index}:{dT.description} 
                                            <p><span className='me-2'>DAY:{dT.day}</span> 
                                            WHEN:{dT.when}</p>
                                        </div>)}
                                    </>
                                )}
                                <li><Button as={Link} to={`/${profile._id}`} variant="primary" className='mb-4'>Modifica Posizione Lavorativa</Button></li>
                                <li><Button as={Link} to={`/payments/${profile.whoIs.employeeData._id}`} variant="primary" className='mb-4'>Aggiungi Pagamento</Button></li>
                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            </Card.Body>
        </Card>
    </Col>)
}

export default ProfileOne