import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProfileList from './components/profile/ProfileList';
import ProfileContextProvider from './components/context/ProfileContextProvider';
import NavbarMe from './components/view/NavbarMe';

function App() {
  return (
    <ProfileContextProvider>
      <Router>

          <Routes>
            <Route path="/" element={<ProfileList />} />
          </Routes>

      </Router>
    </ProfileContextProvider>
  );
}

export default App;

