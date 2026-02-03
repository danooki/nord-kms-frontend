import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Wiki from './pages/Wiki';
import Tickets from './pages/Tickets';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
