import { useState, useEffect } from 'react';
import styles from './BurgerConstructor.module.css';
import ListBurgerConstructor from './list-burger-constructor/ListBurgerConstructor';
import {
  CurrencyIcon,
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../utils/prop-types';
import Modal from '../modal/Modal';
import OrderDetails from './order-details/OrderDetails';
import { getOrder } from '../../utils/burger-api';

function BurgerConstructor({ data }) {
  const [state, setState] = useState({
    error: false,
    burgerData: null,
    loading: true,
    bun: null,
    constructorData: null,
    loadingOrder: true,
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    setState({
      ...state,
      burgerData: data.filter((bun) => bun.type !== 'bun'),
      bun: data.filter((bun) => bun.name === 'Краторная булка N-200i'),
      loading: false,
    });
  }, []);

  // Получаем список заказа для конструктора.
  useEffect(() => {
    const getConstructorData = async () => {
      setState({ ...state, loadingOrder: true });
      try {
        const data = await getOrder();

        console.log(data);

        setState({ ...state, constructorData: data.data, loadingOrder: false });
      } catch (err) {
        setState({ ...state, error: true });
      }
    };
    getConstructorData();
  }, []);

  if (state.loadingOrder) {
    console.log(state.constructorData);
  }

  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    handleCloseModal();
  };

  const modal = (
    <Modal onClose={handleCloseModal}>
      <section className={`${styles['Container']}`}>
        {/* Заголовок. */}
        <section className={`pt-10 ml-10 ${styles['Title-button']}`}>
          {/* Иконка закрытия. */}
          <section
            className={styles['Button-close']}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </section>
        </section>
        <OrderDetails></OrderDetails>
      </section>
    </Modal>
  );

  return (
    <>
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
                <Button
                  htmlType="button"
                  type="primary"
                  size="large"
                  onClick={handleOpenModal}
                >
                  Оформить заказ
                </Button>
              </div>
            </section>
          </>
        )}
      </section>
      {visible && modal}
    </>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(burgerIngredientsObject).isRequired)
    .isRequired,
};
