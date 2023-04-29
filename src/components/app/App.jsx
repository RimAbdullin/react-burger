import AppHeader from '../app-header/AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

function App() {
  return (
    <>
      <header>
        <AppHeader />
      </header>
      <main>
        <section className={styles[`main-container`]}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </main>
    </>
  );
}

export default App;
