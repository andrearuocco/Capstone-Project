import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileList from './components/profile/ProfileList';
import ProfileContextProvider from './components/context/ProfileContextProvider';
import EmployeeEdit from './components/employee/EmployeeEdit';
import PayEnvelope from './components/payEnvelope/PayEnvelope';
import { fetchGetProfiles } from './data/fetch';
import { ThemeContextProvider } from './components/context/ThemeContextProvider';
import './App.css';

function App() {

  return (
    <ThemeContextProvider><ProfileContextProvider>
      <Router>

        <Routes>
          <Route path="/" element={<ProfileList />} />
          <Route path="/:id" element={<div className="fade-in-appjs"><EmployeeEdit /></div>} />
          <Route path="/:id/payments/:employeeDataId" element={<div className="fade-in-appjs"><PayEnvelope /></div>} />
        </Routes>

      </Router>
    </ProfileContextProvider></ThemeContextProvider>
  )
}

export default App

