import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <header className="app-header">
        <span role="img" aria-label="checklist" style={{fontSize: '2.2rem', verticalAlign: 'middle', marginRight: 12}}>🗂️</span>
        <span className="header-title-gradient">Task Manager</span>
      </header>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;