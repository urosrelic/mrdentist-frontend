import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  role: string;
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { loading, userRole } = useAuth();

  if (loading) {
    return <div>Loading ...</div>;
  }

  return userRole === role ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
