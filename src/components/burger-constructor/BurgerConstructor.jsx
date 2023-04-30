import { useState, useEffect } from 'react';
import styles from './BurgerConstructor.module.css';
import ListBurgerConstructor from './list-burger-constructor/ListBurgerConstructor';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructor(props) {
  const [state, setState] = useState({
    burgerData: null,
    bun: null,
    loading: true,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    setState({
      ...state,
      burgerData: props.data.filter((bun) => bun.type !== 'bun'),
      bun: props.data.filter((bun) => bun.name === 'Краторная булка N-200i'),
      loading: false,
    });
  }, []);

  return (
    <section className={`${styles['Burger-constructor']}`}>
      {!state.loading && (
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
      )}
    </section>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ),
};
