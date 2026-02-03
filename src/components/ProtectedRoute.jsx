import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component for role-based access control
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component to render if access is granted
 * @param {boolean} props.requireAuth - Require authentication (default: true)
 * @param {string[]} props.allowedRoles - Array of allowed roles (e.g., ['admin', 'editor'])
 * @param {string} props.redirectTo - Redirect path if access denied (default: '/login')
 */
export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  allowedRoles = [], 
  redirectTo = '/login' 
}) {
  const { isAuthenticated, user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    if (!isAuthenticated || !allowedRoles.includes(user.role)) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return children;
}
