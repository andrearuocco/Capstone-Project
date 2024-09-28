import React, { useContext, useState, useEffect } from "react";
import { MeContext } from "../context/MeContext";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login() {
    // stato per gestire la visualizzazione dei form
    const [showForm, setShowForm] = useState(true)
    const { me } = useContext(MeContext)
    const navigate = useNavigate()

    const redirectIfLoggedIn = function () {
        if (me) navigate('/')
    }

    useEffect(redirectIfLoggedIn, [me])

    return (
        <Row>
            <Col xs={12} md={12} lg={9} className="d-flex">
                {showForm && <LoginForm showForm={showForm} setShowForm={setShowForm} />}
                {/*  {!showForm && <RegisterForm showForm={showForm} setShowForm={setShowForm} />} */}
            </Col>
            <Col lg={3} className="d-none d-sm-none d-md-none d-lg-block">
{/*                 <div className="loginImage">
                    <img alt="Ti diamo il benvenuto nella tua community professionale" src="https://static.licdn.com/aero-v1/sc/h/dxf91zhqd2z6b0bwg85ktm5s4"></img>
                </div> */}
            </Col>
        </Row>
    );
}

export default Login