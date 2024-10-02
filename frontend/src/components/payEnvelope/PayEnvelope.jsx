import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form } from 'react-bootstrap/';
import { profileId, employeeId } from "../../data/fetch";

function PayEnvelope() {
    const { id } = useParams()
    const [profile, setProfile] = useState({})
    const [employee, setEmployee] = useState({})
    const handlePayment = async () => {

            const EMPLOYEE = await employeeId(id)
            setEmployee(EMPLOYEE)
            console.log(EMPLOYEE.payments)
        
        

       }

    useEffect(()=>{handlePayment()},[])
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
