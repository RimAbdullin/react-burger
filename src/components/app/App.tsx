import { FC, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
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

import Modal from '../modal/Modal';
import { useAppDispatch } from '../../hooks/hooks';
import { ModalActionTypes } from '../../services/store/types/modal';
import { FeedPage } from '../../pages/feed';
import FeedOrderDetails from '../feed/feed-order/feed-order-details/FeedOrderDetails';
import { ProfileOrderPage } from '../../pages/profileOrder';
import ProfileOrderDetails from '../profile-order/profile-order-details/ProfileOrderDetails';

const App: FC = () => {
  return <ModalSwitch />;
};

export default App;

const ModalSwitch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let background = location.state && location.state.background;

  const user = useUser();
  const dispatch = useAppDispatch();

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
      type: ModalActionTypes.CLEAR_ITEM,
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
        <Route
          path="/ingredients/:_id"
          element={<IngredientDetails modal={false} />}
        />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:_id" element={<FeedOrderDetails modal={false} />} />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path="/profile/orders"
          element={<ProtectedRouteElement element={<ProfileOrderPage />} />}
        />
        <Route
          path="/profile/orders/:_id"
          element={
            <ProtectedRouteElement
              element={<ProfileOrderDetails modal={false} />}
            />
          }
        />
        <Route element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:_id"
            element={
              <Modal
                isTitle={true}
                title={'Детали ингредиента'}
                onClose={handleModalClose}
              >
                <IngredientDetails modal={true} />
              </Modal>
            }
          />

          <Route
            path="/feed/:_id"
            element={
              <Modal isTitle={true} title={''} onClose={handleModalClose}>
                <FeedOrderDetails modal={true} />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:_id"
            element={
              <Modal isTitle={true} title={''} onClose={handleModalClose}>
                <ProtectedRouteElement
                  element={<ProfileOrderDetails modal={true} />}
                />
              </Modal>
            }
          />
        </Routes>
      )}
    </section>
  );
};
