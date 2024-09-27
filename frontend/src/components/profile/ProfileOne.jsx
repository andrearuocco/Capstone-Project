import {Card, Col, Button} from 'react-bootstrap/'
import './ProfileOne.css'

function ProfileOne({profile}) {
    console.log(profile) 
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
                <Button variant="primary">ProfileDetails</Button>
            </Card.Body>
        </Card>
    </Col>)
}

export default ProfileOne