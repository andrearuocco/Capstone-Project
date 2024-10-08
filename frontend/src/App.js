import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileList from './components/profile/ProfileList';
import ProfileContextProvider from './components/context/ProfileContextProvider';
import EmployeeEdit from './components/employee/EmployeeEdit';
import PayEnvelope from './components/payEnvelope/PayEnvelope';
import { fetchGetProfiles } from './data/fetch';
import { ThemeContextProvider } from './components/context/ThemeContextProvider';

function App() {
  /*   const [profile, setProfile] = useState([])
  useEffect(() => {
    fetchGetProfiles().then(data => setProfile(data))
  }, []) */
  return (
    <ThemeContextProvider><ProfileContextProvider>
      <Router>

        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/:id" element={<EmployeeEdit />} />
          <Route path="/:id/payments/:employeeDataId" element={<PayEnvelope /* profiles={profile} *//>} />
        </Routes>

      </Router>
    </ProfileContextProvider></ThemeContextProvider>
  );
}

export default App;

