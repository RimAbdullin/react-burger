import React, { FC } from 'react';
import { useUser } from '../../hooks/useUser';
import { useLocation, Navigate } from 'react-router-dom';

interface IProtectedRouteElementProps {
  element: React.ReactElement;
}

export const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  element,
}): React.ReactElement => {
  const user = useUser();

  const location = useLocation();

  return user.isAuthChecked && user.user && element ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ redirectTo: location }} />
  );
};
