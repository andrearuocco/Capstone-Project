import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProfileList from './components/profile/ProfileList';
import Login from './components/view/Login';
import { ProfileContextProvider } from './components/context/ProfileContextProvider';

function App() {
  return (
    <ProfileContextProvider>
      <Router>
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProfileList />} />
          </Routes>
        </Container>
      </Router>
    </ProfileContextProvider>
  );
}

export default App;

