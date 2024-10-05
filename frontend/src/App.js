import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileList from './components/profile/ProfileList';
import ProfileContextProvider from './components/context/ProfileContextProvider';
import EmployeeEdit from './components/employee/EmployeeEdit';
import PayEnvelope from './components/payEnvelope/PayEnvelope';
import EmployeeRequest from './components/request/EmployeeRequest';
import AdminRes from './components/request/AdminRes';

function App() {
  return (
    <ProfileContextProvider>
      <Router>

        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/:id" element={<EmployeeEdit />} />
          <Route path="/:id/payments/:employeeDataId" element={<PayEnvelope />} />

          <Route path="/admin/requests" element={<AdminRes />} /> 
          <Route path="/employee/leave-request" element={<EmployeeRequest />} />
        </Routes>

      </Router>
    </ProfileContextProvider>
  );
}

export default App;

