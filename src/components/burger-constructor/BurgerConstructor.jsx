import { useState, useEffect } from 'react';
import styles from './BurgerConstructor.module.css';
import ListBurgerConstructor from './list-burger-constructor/ListBurgerConstructor';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { API_DATA } from '../../data';

function BurgerConstructor() {
  const [state, setState] = useState({
    error: false,
    burgerData: null,
    loading: true,
    bun: null,
  });

  useEffect(() => {
    const getBurgerData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(API_DATA);

        const data = await res.json();

        setState({
          ...state,
          burgerData: data.data.filter((bun) => bun.type !== 'bun'),
          bun: data.data.filter((bun) => bun.name === 'Краторная булка N-200i'),
          loading: false,
        });
      } catch (err) {
        setState({ ...state, error: true });
      }
    };

    getBurgerData();
  }, []);

  return (
    <section className={`${styles['Burger-constructor']}`}>
      {state.error ? (
        <h1 style={{ textAlign: 'center' }}>Данные не найдены.</h1>
      ) : (
        !state.loading && (
          <>
            <section className={`mt-25`}>
              <ListBurgerConstructor
                data={state.burgerData}
                bun={state.bun[0]}
              ></ListBurgerConstructor>
            </section>
            {/* Информация. */}
            <section className={`mt-10 mr-4 ${styles['Info-container']}`}>
              <div className={`${styles['Info-price-container']}`}>
                <span className={`mr-2 text_type_digits-medium`}>610</span>

                <CurrencyIcon type="primary" />
              </div>
              <div className={`ml-10 ${styles['Info-price-container ']}`}>
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
