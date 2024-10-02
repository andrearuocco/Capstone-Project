import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileList from './components/profile/ProfileList';
import ProfileContextProvider from './components/context/ProfileContextProvider';

function App() {
  return (
    <ProfileContextProvider>
      <Router>

          <Routes>
            <Route path="/" element={<ProfileList  />} />
   
          </Routes>

      </Router>
    </ProfileContextProvider>
  );
}

export default App;

