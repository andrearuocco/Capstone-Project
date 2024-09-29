import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "../context/ProfileContextProvider";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
function Login() {
    // stato per gestire la visualizzazione dei form
    const [showForm, setShowForm] = useState(true)
    const { me } = useContext(ProfileContext)
    const navigate = useNavigate()
    useEffect(() => {
        if (me) {
          navigate('/')
        }
      }, [me]);
    return (
        <Row>
            <Col xs={12} md={12} lg={9} className="d-flex">
                {showForm && <LoginForm showForm={showForm} setShowForm={setShowForm} />}
                {/*  {!showForm && <RegisterForm showForm={showForm} setShowForm={setShowForm} />} */}
            </Col>
            <Col lg={3} className="d-none d-sm-none d-md-none d-lg-block">
                <Button as={Link} to={'http://localhost:5000/api/v1/auth/login-google'} className="m-4" variant="primary">Login with Google</Button>
            </Col>
        </Row>
    );
}
export default Login
