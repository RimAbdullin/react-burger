import { useState } from 'react';
import AppHeader from '../app-header/AppHeader';
import Modal from '../modal/Modal';
import styles from './App.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

function App() {
  // const [modal, setModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setModal(true)}>Открыть диалоговое окно</button>
      <Modal visible={modal} setVisible={setModal}>
        123
      </Modal> */}
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
