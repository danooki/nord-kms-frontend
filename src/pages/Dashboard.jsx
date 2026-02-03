import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Dashboard component that redirects users to their role-appropriate page
 */
export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login', { replace: true });
        return;
      }

      // Redirect based on role
      switch (user?.role) {
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'editor':
          navigate('/tickets', { replace: true });
          break;
        case 'registered':
          navigate('/wiki', { replace: true });
          break;
        default:
          navigate('/wiki', { replace: true });
      }
    }
  }, [user, isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-600">Redirecting...</div>
    </div>
  );
}
