import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileList from './components/profile/ProfileList';
import ProfileContextProvider from './components/context/ProfileContextProvider';
import EmployeeEdit from './components/employee/EmployeeEdit';

function App() {
  return (
    <ProfileContextProvider>
      <Router>

          <Routes>
            <Route path="/" element={<ProfileList  />} />
            <Route path="/:id" element={<EmployeeEdit  />} />
          </Routes>

      </Router>
    </ProfileContextProvider>
  );
}

export default App;

