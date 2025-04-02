import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import LoginPage from './pages/LoginPage';
import AssessmentList from './pages/AssessmentList';
import AssessmentDashboard from './pages/AssessmentDashboard';
import Planning from './pages/Planning';
import DataSynthesis from './pages/DataSynthesis';
import Deliverables from './pages/Deliverables';
import Strategy from './pages/Strategy';
import Growth from './pages/Growth';
import './App.css';

const MainContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1440px',
  padding: theme.spacing(0, 4),
  width: '100%'
}));

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
            <MainContainer>
              <AssessmentList />
            </MainContainer> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/assessments/:customerName/*" 
          element={
            isAuthenticated ? 
            <Routes>
              <Route path="dashboard" element={<MainContainer><AssessmentDashboard /></MainContainer>} />
              <Route path="planning" element={<MainContainer><Planning /></MainContainer>} />
              <Route path="data-synthesis" element={<MainContainer><DataSynthesis /></MainContainer>} />
              <Route path="deliverables" element={<MainContainer><Deliverables /></MainContainer>} />
              <Route path="strategy" element={<MainContainer><Strategy /></MainContainer>} />
              <Route path="growth" element={<MainContainer><Growth /></MainContainer>} />
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
