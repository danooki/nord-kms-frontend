import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Wiki from './pages/Wiki';
import Tickets from './pages/Tickets';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/wiki" replace />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
