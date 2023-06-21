import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import { useDispatch } from 'react-redux';
import { getIngredientsItems } from '../../services/actions/ingredients';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
} from '../../pages';
import { ProfilePage } from '../../pages/profile';
import { useUser } from '../../hooks/useUser';
import { ProtectedRouteElement } from '../protected-route-element/ProtectedRouteElement';
import { IngredientDetails } from '../burger-ingredients/ingredient-details/IngredientDetails';
import { CLEAR_ITEM } from '../../services/actions/modal';

import Modal from '../modal/Modal';

function App() {
  return <ModalSwitch />;
}

export default App;

const ModalSwitch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let background = location.state && location.state.background;

  const user = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    // Инициализируем объекты с ингредиентами.
    dispatch(getIngredientsItems('Краторная булка N-200i'));
  }, [dispatch]);

  useEffect(() => {
    user.checkAuth();
  }, []);

  if (user.isLoadingCheckAuth) {
    return null;
  }

  const handleModalClose = () => {
    dispatch({
      type: CLEAR_ITEM,
    });
    navigate(-1);
  };

  return (
    <section className={styles.Page}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:_id" element={<IngredientDetails />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:_id"
            element={
              <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </section>
  );
};
