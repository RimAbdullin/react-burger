import { useState, useEffect, useContext } from 'react';
import styles from './BurgerConstructor.module.css';
import ListBurgerConstructor from './list-burger-constructor/ListBurgerConstructor';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from './order-details/OrderDetails';
import { getOrder } from '../../utils/burger-api';
import { IngredientsContext } from '../../services/appContext';
import { useModal } from '../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';

function BurgerConstructor() {
  // Определяем объект состояния компонента.
  const [state, setState] = useState({
    error: false,
    burgerData: null,
    loading: true,
    bun: null,
    orderNumber: null,
    loadingOrder: true,
    ingredientsPrice: null,
    bunPrice: null,
  });

  const order = useSelector((store) => store.order.number);
  // Вытаскиваем селектором нужные данные из хранилища
  const { items, itemsRequest, itemsFailed } = useSelector(
    (state) => state.ingredients
  );

  const { isModalOpen, openModal, closeModal } = useModal();

  // Получаем из контекста массив объектов ингредиентов.
  const { ingredients, bunName } = useContext(IngredientsContext);

  // Обновляем состояния.
  useEffect(() => {
    setState({ ...state, loading: true });
    setState({
      ...state,
      ingredients: ingredients.filter((item) => item.type !== 'bun'),
      bun: ingredients.filter((item) => item.name === bunName),

      ingredientsPrice: ingredients.reduce((sum, record) => {
        if (record.type !== 'bun') {
          return sum + record.price;
        } else {
          return sum;
        }
      }, 0),

      bunPrice: ingredients.filter((item) => item.name === bunName)[0].price,

      loading: false,
    });
  }, [ingredients]);

  // Получаем объект для body запроса с id ингредиентов.
  const getBody = () => {
    return {
      ingredients: state.ingredients.map((item) => {
        return item._id;
      }),
    };
  };

  // Получаем номер заказа для конструктора и открываем модальное окно.
  const handleOpenModal = async () => {
    try {
      setState({ ...state, loadingOrder: true });

      const data = await getOrder(getBody());
      setState({
        ...state,
        orderNumber: data.order.number,
        loadingOrder: false,
      });
      openModal();
    } catch (err) {
      setState({ ...state, error: true });
    }
  };

  // Закрытие модального окна.
  // const handleCloseModal = () => {
  //   setVisible(false);
  // };

  const handleClick = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const modal = (
    <Modal onClose={closeModal} title={''}>
      {!state.loadingOrder && (
        <OrderDetails orderNumber={state.orderNumber}></OrderDetails>
      )}
    </Modal>
  );

  return (
    <>
      <section className={`${styles['Burger-constructor']}`}>
        {!state.loading && (
          <>
            <section className={`mt-25`}>
              <ListBurgerConstructor
                data={state.ingredients}
                bun={state.bun[0]}
              ></ListBurgerConstructor>
            </section>
            {/* Информация. */}
            <section className={`mt-10 mr-4 ${styles['Info-container']}`}>
              <div className={`${styles['Info-price-container']}`}>
                <span className={`mr-2 text_type_digits-medium`}>
                  {state.ingredientsPrice + state.bunPrice}
                </span>

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
      {isModalOpen && modal}
    </>
  );
}

export default BurgerConstructor;
