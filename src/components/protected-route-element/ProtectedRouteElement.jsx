import { useUser } from '../../hooks/useUser';
import { useLocation, Navigate } from 'react-router-dom';

export function ProtectedRouteElement({ element }) {
  const user = useUser();

  const location = useLocation();

  return user.isAuthChecked && user.user ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ redirectTo: location }} />
  );
}
