import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProfileList from './components/profile/ProfileList';
import ProfileContextProvider from './components/context/ProfileContextProvider';
import NavbarMe from './components/view/NavbarMe';
import { useState } from 'react';
import EmployeeEdit from './components/employee/EmployeeEdit';

function App() {
  const [profile, setProfile] = useState([])
  return (
    <ProfileContextProvider>
      <Router>

          <Routes>
            <Route path="/" element={<ProfileList profile={profile} setProfile={setProfile} />} />
            <Route path="/:id" element={<EmployeeEdit profile={profile} />} />
          </Routes>

      </Router>
    </ProfileContextProvider>
  );
}

export default App;

