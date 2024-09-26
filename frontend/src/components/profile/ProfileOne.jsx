import {Card, Col, Button} from 'react-bootstrap/'

function ProfileOne({profile}) {
    console.log(profile) 
    return (<Col xs={12} sm={6} md={4} lg={3} className="my-3">
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={profile.avatar} style={{ height: '18rem' }} />
            <Card.Body>
                <Card.Title>{profile.name} {profile.surname} {` - ${profile.whoIs.type}`}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    </Col>)
}

export default ProfileOne