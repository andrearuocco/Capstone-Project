import { Card, Col, Button, Offcanvas } from 'react-bootstrap/'
import './ProfileOne.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const offcanvasConfig = {
    name: 'Profile Details',
    scroll: true,
    backdrop: true,
};

function ProfileOne({ profile }) {
    console.log(profile)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (<Col xs={12} sm={6} md={4} lg={3} className="my-3">
        <Card /* style={{ width: '18rem' }} */ className='card-po' >
            <Card.Img variant="top" src={profile.avatar} style={{ height: '13rem' }} />
            <Card.Body className='bg-gradient bg-opacity-10 bg-dark'>
                <Card.Title className='overF card-po-title text-opacity-75 text-danger'>{profile.name} {profile.surname} {` - ${profile.whoIs.type}`}</Card.Title>
                <Card.Text className='text-black-75 card-po-text'>
                    {profile.whoIs.type === 'admin' && (
                        <ul className='list-unstyled'>
                            <li className='overF'>Role: {profile.whoIs.adminData.name}</li>
                            <li className='overF'>Description: {profile.whoIs.adminData.description}</li>
                        </ul>
                    )}
                    {profile.whoIs.type === 'employee' && (
                        <ul className='list-unstyled'>
                            <li className='overF'>Role: {profile.whoIs.employeeData.role}</li>

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
                    <Button onClick={toggleShow} className="bg-opacity-50 bg-success-subtle me-2 button-po text-b-po text-opacity-75 text-black w-50">
                        {offcanvasConfig.name}
                    </Button>
                    <Offcanvas show={show} onHide={handleClose} scroll={offcanvasConfig.scroll} backdrop={offcanvasConfig.backdrop} className='bord-canvas'>
                        <Offcanvas.Header closeButton className='bg-gradient bg-opacity-10 bg-dark text-white-50 text-b-po mb-4'>
                            <Offcanvas.Title>Profile Details</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul className='list-unstyled d-flex flex-column'>
                                <li className='d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mb-4 pb-4'>
                                    <Card.Img variant="top" className='border-50 me-3 mb-4 mb-sm-0' src={profile.avatar} />
                                    <div className='text-black-50'>{profile.name} {profile.surname}</div>
                                    <div>{profile.whoIs.type === 'admin' && (
                                        <ul className='list-unstyled'>
                                            <li className='text-black-50'><span className='text-white text-opacity-50'>Role:</span> {profile.whoIs.adminData.name}</li>
                                        </ul>
                                    )}
                                    {profile.whoIs.type === 'employee' && (
                                        <ul className='list-unstyled'>
                                            <li className='text-black-50'><span className='text-white text-opacity-50'>Role:</span> {profile.whoIs.employeeData.role}</li>
                                        </ul>
                                    )}</div>
                                </li>
                                <li className='mb-4 typing-text mt-3 text-black-50'><span className='text-white text-opacity-50'>Email:</span> {profile.email}</li>
                                <li className='mb-4 typing-text text-black-50'><span className='text-white text-opacity-50'>Birthday:</span> {new Date(profile.birthday).toLocaleDateString('it-IT')}</li>
                                <li className='mb-4 typing-text text-black-50'><span className='text-white text-opacity-50'>Country:</span> {profile.country}</li>
                                <li className='mb-4 typing-text text-black-50'><span className='text-white text-opacity-50'>IBAN:</span> {profile.IBAN}</li>
                                <li className='mb-4 typing-text text-black-50'><span className='text-white text-opacity-50'>TIN:</span> {profile.TIN}</li>
                                {profile.whoIs.type === 'employee' && (
                                    <> {profile.whoIs.employeeData.dailyTask.map((dT, index) => <div className='typing-text'><span className='text-white text-opacity-50'>dailyTask{index}:</span><p className='text-black-50 mb-0'>{dT.description}</p>
                                            <p className='text-black-50 mt-0'><span className='me-2'><span className='text-white text-opacity-50'>DAY:</span>{dT.day}</span> 
                                            <span className='text-white text-opacity-50'>WHEN:</span>{dT.when}</p>
                                        </div>)}
                                    </>
                                )}
                             
                                {profile.whoIs.employeeData && profile.whoIs.employeeData._id && (<>
                                    <Button as={Link} to={`/${profile._id}`} className='mt-4 mb-4 button-blue-po w-50'>Posizione Lavorativa</Button>
                                    <Button as={Link} to={`/${profile._id}/payments/${profile.whoIs.employeeData._id}`} className='mb-4 button-blue-po w-50'>
                                        Aggiungi Pagamento
                                    </Button></>
                                )}
                            </ul>
                        </Offcanvas.Body>
                        <footer className='offc-f sticky-bottom'>Amministrazione & Gestione</footer>
                    </Offcanvas>
                </>
            </Card.Body>
        </Card>
    </Col>)
}

export default ProfileOne