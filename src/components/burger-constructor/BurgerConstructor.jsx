import { useState, useEffect } from 'react';
import styles from './BurgerConstructor.module.css';
import ListBurgerConstructor from './list-burger-constructor/ListBurgerConstructor';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from './order-details/OrderDetails';
import { useModal } from '../../hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber } from '../../services/actions/order';
import { ADD_ITEM_CONSTRUCTOR } from '../../services/actions/ingredientsConstructor';
import { INCREASE_ITEM, SET_BUN } from '../../services/actions/ingredients';
import { v4 } from 'uuid';
import {
  getIngredientsConstructorSelector,
  getIngredientsSelector,
} from '../../services/selectors/selector';

function BurgerConstructor() {
  // Определяем объект состояния компонента.
  const [state, setState] = useState({
    ingredientsPrice: null,
    bunPrice: null,
    isCalculatingPrice: false,
  });

  // Получаем данные из хранилища redux.
  // Выбранную булку и список выбранных ингредиентов для конструктора.
  const dispatch = useDispatch();

  const { ingredientsConstructor } = useSelector(
    getIngredientsConstructorSelector
  );

  const { currentBun } = useSelector(getIngredientsSelector);

  // Добавление ингредиента в конструктор.
  const handleDrop = (item) => {
    if (item.type === 'bun') {
      dispatch({
        type: SET_BUN,
        bunName: item.name,
        id: v4(),
      });
    } else {
      dispatch({
        type: ADD_ITEM_CONSTRUCTOR,
        item: { id: v4(), ...item },
      });

      dispatch({
        type: INCREASE_ITEM,
        itemId: item._id,
      });
    }
  };

  // Для модального окна.
  const { isModalOpen, openModal, closeModal } = useModal();

  // Обновляем состояния.
  useEffect(() => {
    setState({ ...state, isCalculatingPrice: true });

    setState({
      ...state,
      ingredientsPrice: ingredientsConstructor.reduce((sum, record) => {
        return sum + record.price;
      }, 0),

      bunPrice: currentBun?.price ? currentBun.price * 2 : 0,

      isCalculatingPrice: false,
    });
  }, [ingredientsConstructor, currentBun]);

  // Получаем объект для body запроса с id ингредиентов.
  const getBody = () => {
    const body = {
      ingredients: ingredientsConstructor.map((item) => {
        return item._id;
      }),
    };
    body.ingredients.push(currentBun._id);
    return body;
  };

  // Получаем номер заказа для конструктора и открываем модальное окно.
  const handleOpenModal = () => {
    if (ingredientsConstructor && ingredientsConstructor.length > 0) {
      // Получаем номер заказа.
      dispatch(getOrderNumber(getBody()));

      // Открываем модальное окно.
      openModal();
    }
  };

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
    // ingredientsConstructor &&
    // currentBun && (
    <>
      <section className={`${styles['Burger-constructor']}`}>
        <>
          <section className={`mt-25`}>
            <ListBurgerConstructor onDropHandler={handleDrop} />
          </section>
          {/* Информация. */}
          <section className={`mt-10 mr-4 ${styles['Info-container']}`}>
            <div className={`${styles['Info-price-container']}`}>
              {!state.isCalculatingPrice && (
                <span className={`mr-2 text_type_digits-medium`}>
                  {state.ingredientsPrice + state.bunPrice}
                </span>
              )}

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
      </section>
      {isModalOpen && modal}
    </>
  );
}

export default BurgerConstructor;
