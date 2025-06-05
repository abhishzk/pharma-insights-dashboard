import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CompoundsPage from './pages/CompoundsPage';
import AnalysisPage from './pages/AnalysisPage';
import TeamPage from './pages/TeamPage';
import DashboardLayout from './components/dashboard/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="compounds" element={<CompoundsPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>
        
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;