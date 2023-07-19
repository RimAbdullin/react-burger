import React, { FC } from 'react';
import { useUser } from '../../hooks/useUser';
import { useLocation, Navigate } from 'react-router-dom';
import { getCookie } from '../../services/common/common';

interface IProtectedRouteElementProps {
  element: React.ReactElement;
}

export const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  element,
}): React.ReactElement => {
  const user = useUser();

  const location = useLocation();

  if (!getCookie('accessToken')) {
    return <Navigate to="/login" replace state={{ redirectTo: location }} />;
  }

  return element;
};
