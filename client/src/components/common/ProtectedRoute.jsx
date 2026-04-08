import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * Wraps admin routes — redirects unauthenticated users to /admin/login.
 */
const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" text="Authenticating..." />;
  if (!isAuthenticated) return <Navigate to={redirectTo} replace />;

  return children;
};

export default ProtectedRoute;
