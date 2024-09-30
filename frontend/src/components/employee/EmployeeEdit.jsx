import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card, Row, Col, Container } from 'react-bootstrap/';


function EmployeeDetails({profile}) {
    const { id } = useParams() 
    const [prof, setProf] = useState(profile.find(p => p._id === id )) 
    console.log(prof.name)
    return (
    <Container>
        
        <Row>
            <Col sm={5} >
               {/*  <Card.Img variant="top" src={book.img} style={{ height: '27rem' }} className="mb-5 radius-bd" />
                <Card.Body >
                    <Card.Title className={theme === 'light' ? 'd-flex justify-content-between align-items-center' : 'text-white d-flex justify-content-between align-items-center'}><p>{book.title}</p> <p>{book.price}</p></Card.Title>
                    <Card.Text className={theme === 'light' ? '' : 'text-white'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam consequuntur officiis mollitia dolorum sint eligendi ratione quod maxime iusto quas eveniet, nulla unde nihil necessitatibus excepturi sit aperiam totam vero?
                    </Card.Text>
                </Card.Body> */}
            </Col >
            <Col sm={7} ><p>{prof.name}</p>
                {/* <CommentArea asin={asin} /> */}
            </Col>
        </Row>
    </Container>
    );
}

export default EmployeeDetails;