import {Card, Col, Button} from 'react-bootstrap/'
import './ProfileOne.css'

function ProfileOne({profile}) {
    console.log(profile) 
    return (<Col xs={12} sm={6} md={4} lg={3} className="my-3">
        <Card style={{ width: '18rem' }} >
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
                            {profile.whoIs.employeeData.dailyTask.map(dT =>  <li className='overF'>dailyTask: {dT.description} {dT.day}</li> )}
                        </ul>
                    )}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </Col>)
}

export default ProfileOne