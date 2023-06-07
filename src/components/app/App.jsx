import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useDispatch } from 'react-redux';
import { getIngredientsItems } from '../../services/actions/ingredients';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LoginPage } from '../../pages/login';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Инициализируем объекты с ингредиентами.
    dispatch(getIngredientsItems('Краторная булка N-200i'));
  }, [dispatch]);

  return (
    <section className={styles.Page}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <AppHeader />
      <main>
        <section className={styles[`Main-container`]}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </section>
      </main>
    </section>
  );
}

export default App;
