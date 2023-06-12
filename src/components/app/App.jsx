import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import { useDispatch } from 'react-redux';
import { getIngredientsItems } from '../../services/actions/ingredients';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
} from '../../pages/';
import { ProfilePage } from '../../pages/profile';
import { useAuth } from '../../hooks/useAuth';
import { ProtectedRouteElement } from '../protected-route-element/ProtectedRouteElement';

function App() {
  const auth = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    // Инициализируем объекты с ингредиентами.
    dispatch(getIngredientsItems('Краторная булка N-200i'));
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      auth.checkAuth();
    }
  }, []);

  if (auth.isLoadingCheckAuth) {
    return null;
  }

  return (
    <section className={styles.Page}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route
            path="/forgot-password"
            element={<ProtectedRouteElement element={<ForgotPasswordPage />} />}
          />
          <Route
            path="/reset-password"
            element={<ProtectedRouteElement element={<ResetPasswordPage />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<ProfilePage />} />}
          />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
