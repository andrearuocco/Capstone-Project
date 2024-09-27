import React from "react";
import { Link } from "react-router-dom"
import { Button, Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import ProfileList from "./components/profile/ProfileList";

function App() {
  return (
/*  <Router>
      <Button as={Link} to={'http://localhost:5000/api/v1/auth/login-google'} className="m-4" variant="primary">Login with Google</Button>
    </Router> */
    <Container>
      <ProfileList/>
    </Container>
  );
}

export default App;
