import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export function ProtectedRouteElement({ element }) {
  const auth = useAuth();

  // console.log('**********************');
  // console.log('=== element', element);
  // console.log('=== auth.isAuth', auth.isAuth);

  // if (!auth.isAuth) {
  //   return null;
  // }

  return auth.isAuth ? element : <Navigate to="/login" replace />;
}
