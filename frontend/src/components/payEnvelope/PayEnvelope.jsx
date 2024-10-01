import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form } from 'react-bootstrap/';
import { profileId } from "../../data/fetch";

function PayEnvelope() {
    const { id } = useParams() // prendo id dalla richiesta 
    const [employee, setEmployee] = useState({}) // creo uno stato perché avrò bisogno del doc. employee corrisponde a quello del profile cercato
/*  const profile = async () => {await profileId(id).then(data => console.log(data))}
    const [prof, setProf] = useState({profile.find(p => p._id === id)}) */
    const handlePayment = async () => {
        const profile = await profileId(id)
        const employee = profile.whoIs.employeeData 

    } 
    return (
        <Container>
            <Row>
                <Col sm={5}></Col>
                <Col sm={7}></Col>
            </Row>
        </Container>
    );
}

export default PayEnvelope
