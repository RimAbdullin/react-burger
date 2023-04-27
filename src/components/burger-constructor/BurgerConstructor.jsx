import { useState, useEffect } from 'react';
import styles from './BurgerConstructor.module.css';
import ListBurgerConstructor from './list-burger-constructor/ListBurgerConstructor';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  const [state, setState] = useState({
    error: false,
    burgerData: null,
    loading: true,
    bun: null,
    main: null,
    sauce: null,
  });

  useEffect(() => {
    const getBurgerData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(
          `https://norma.nomoreparties.space/api/ingredients`
        );

        const data = await res.json();

        setState({
          burgerData: data.data,
          loading: false,
        });
      } catch (err) {
        setState({ ...state, error: true });
      }
    };

    getBurgerData();
  }, []);

  return (
    <section className={`${styles.Container}`}>
      {state.error ? (
        <h1 style={{ textAlign: 'center' }}>Данные не найдены.</h1>
      ) : (
        !state.loading && (
          <>
            <section className={`mt-25 custom-scroll ${styles['Scroll-area']}`}>
              <ListBurgerConstructor
                data={state.burgerData}
              ></ListBurgerConstructor>
            </section>
            {/* Информация. */}
            <section className={`mt-10 mr-4 ${styles['Info-container']}`}>
              <div
                className={`${styles['Info-price-container']} ${styles['Card-border']}`}
              >
                <span className={`mr-2 text_type_digits-medium`}>610</span>

                <CurrencyIcon type="primary" />
              </div>
              <div
                className={`ml-10 ${styles['Info-price-container ']} ${styles['Card-border']}`}
              >
                <Button htmlType="button" type="primary" size="large">
                  Оформить заказ
                </Button>
              </div>
            </section>
          </>
        )
      )}
    </section>
  );
}

export default BurgerConstructor;
