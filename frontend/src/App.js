import React from "react";
import { Link } from "react-router-dom"
import { Button, Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileList from "./components/profile/ProfileList";
import { MeProvider } from "./components/context/MeContext";
import Login from "./components/view/Login";
import ProtectedRoutes from './components/routes/ProtectedRoutes';

function App() {
  return (
/*  <Router>
      <Button as={Link} to={'http://localhost:5000/api/v1/auth/login-google'} className="m-4" variant="primary">Login with Google</Button>
    </Router> */
    <MeProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <ProfileList />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Container>
      </Router>
    </MeProvider>
  );
}

export default App;
