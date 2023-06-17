import { useAuth } from '../../hooks/useAuth';
import { useLocation, Navigate } from 'react-router-dom';

export function ProtectedRouteElement({ element }) {
  const auth = useAuth();

  const location = useLocation();

  return auth.isAuth ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ redirectTo: location }} />
  );
}
