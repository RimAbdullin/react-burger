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
import { addItem } from '../../services/actions/ingredients';

function BurgerConstructor() {
  // Определяем объект состояния компонента.
  const [state, setState] = useState({
    ingredientsPrice: null,
    bunPrice: null,
    isCalculatingPrice: false,
  });

  const [elements, setElements] = useState([]);
  const [draggedElements, setDraggedElements] = useState([]);

  // Получаем данные из хранилища redux.
  // Выбранную булку и список выбранных ингредиентов для конструктора.
  const dispatch = useDispatch();

  const { ingredientsConstructor, currentBun } = useSelector(
    (store) => store.ingredients
  );

  // Добавление ингредиента в конструктор.
  const handleDrop = (itemId) => {
    const ingredientConstructor = { id: Date.now(), itemId: itemId._id };
    console.log('=== define element', ingredientConstructor);
    dispatch(addItem(ingredientConstructor));

    // setElements([...elements.filter((element) => element.id !== itemId.id)]);

    // setDraggedElements([
    //   ...draggedElements,
    //   ...elements.filter((element) => element.id === itemId.id),
    // ]);
  };

  // Для модального окна.
  const { isModalOpen, openModal, closeModal } = useModal();

  // Обновляем состояния.
  useEffect(() => {
    setState({ ...state, isCalculatingPrice: true });

    setState({
      ...state,
      ingredientsPrice: ingredientsConstructor.reduce((sum, record) => {
        return sum + record.ingredient.price;
      }, 0),

      bunPrice: currentBun?.price ? currentBun.price : 0,

      isCalculatingPrice: false,
    });
  }, [ingredientsConstructor, currentBun]);

  // Получаем объект для body запроса с id ингредиентов.
  const getBody = () => {
    return {
      ingredients: ingredientsConstructor.map((item) => {
        return item._id;
      }),
    };
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
