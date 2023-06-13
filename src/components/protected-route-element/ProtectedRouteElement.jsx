import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuthSelector } from '../../services/selectors/selector';

export function ProtectedRouteElement({ element }) {
  // const auth = useAuth();

  const {
    isAuth,
    loginRequest,
    loginFailed,
    refreshTokenRequest,
    refreshTokenFailed,
    logoutRequest,
    logoutFailed,
  } = useSelector(getAuthSelector);

  console.log('private');
  console.log(isAuth);

  return isAuth ? element : <Navigate to="/login" replace />;
}
