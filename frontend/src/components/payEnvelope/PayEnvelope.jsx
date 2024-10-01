import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form } from 'react-bootstrap/';

function PayEnvelope() {
    const { id } = useParams() // prendo id dalla richiesta 
    /* const [prof, setProf] = useState({profile.find(p => p._id === id)}) */ // cerco il profilo corrispondente a quello della richiesta per mostrare i suoi dati
    const [employee, setEmployee] = useState({}) // creo uno stato perché avrò bisogno del doc. employee corrisponde a quello del profile cercato

    return (
        <Container>
    
        </Container>
    );
}

export default PayEnvelope
