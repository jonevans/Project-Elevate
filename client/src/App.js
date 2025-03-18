import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AssessmentList from './pages/AssessmentList';
import AssessmentDashboard from './pages/AssessmentDashboard';
import Planning from './pages/Planning';
import DataSynthesis from './pages/DataSynthesis';
import Deliverables from './pages/Deliverables';
import Strategy from './pages/Strategy';
import Growth from './pages/Growth';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/assessments" replace /> : 
            <LoginPage setIsAuthenticated={setIsAuthenticated} />
          } 
        />
        <Route 
          path="/assessments" 
          element={
            isAuthenticated ? 
            <AssessmentList /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/assessments/:customerName/*" 
          element={
            isAuthenticated ? 
            <Routes>
              <Route path="dashboard" element={<AssessmentDashboard />} />
              <Route path="planning" element={<Planning />} />
              <Route path="data-synthesis" element={<DataSynthesis />} />
              <Route path="deliverables" element={<Deliverables />} />
              <Route path="strategy" element={<Strategy />} />
              <Route path="growth" element={<Growth />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes> : 
            <Navigate to="/" replace />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
