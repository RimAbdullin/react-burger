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
import { getOrderNumberThunk } from '../../services/actions/order';
import { v4 } from 'uuid';
import {
  getIngredientsConstructorSelector,
  getIngredientsSelector,
} from '../../services/selectors/selector';

import { useUser } from '../../hooks/useUser';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { IngredientsActionTypes } from '../../services/store/types/ingredients';
import { useAppDispatch } from '../../hooks/hooks';
import { IngredientsConstructorActionTypes } from '../../services/store/types/ingredientsConstructor';
import { IBurgerIngredient } from '../../services/common/interfaces';
import { OrderRequestBody } from '../../services/store/types/order';
import { useNavigate } from 'react-router-dom';

interface IState {
  ingredientsPrice: null | number;
  bunPrice: null | number;
  isCalculatingPrice: boolean;
  loadingOrder: boolean;
}

function BurgerConstructor() {
  const user = useUser();

  // Определяем объект состояния компонента.
  const [state, setState] = useState<IState>({
    ingredientsPrice: null,
    bunPrice: null,
    isCalculatingPrice: false,
    loadingOrder: false,
  });

  // Получаем данные из хранилища redux.
  // Выбранную булку и список выбранных ингредиентов для конструктора.
  const dispatch = useAppDispatch();

  const { ingredientsConstructor } = useTypedSelector(
    getIngredientsConstructorSelector
  );

  const { currentBun } = useTypedSelector(getIngredientsSelector);

  // Добавление ингредиента в конструктор.
  const handleDrop = (item: IBurgerIngredient) => {
    if (item.type === 'bun') {
      dispatch({
        type: IngredientsActionTypes.SET_BUN,
        bunName: item.name,
        id: v4(),
      });
    } else {
      dispatch({
        type: IngredientsConstructorActionTypes.ADD_ITEM_CONSTRUCTOR,
        item: { id: v4(), ...item },
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
  const getBody = (): OrderRequestBody => {
    const body = {
      ingredients: ingredientsConstructor.map((item) => {
        return item._id;
      }),
    };
    if (currentBun) {
      body.ingredients.push(currentBun._id);
    }

    return body;
  };

  // Получаем номер заказа для конструктора и открываем модальное окно.
  const navigate = useNavigate();

  const handleOpenModal = () => {
    if (!currentBun) {
      return;
    }

    if (user.isAuthChecked && user.user) {
      if (ingredientsConstructor && ingredientsConstructor.length > 0) {
        // Получаем номер заказа.
        dispatch(getOrderNumberThunk(getBody()));

        // Открываем модальное окно.
        openModal();
      }
    } else {
      navigate('/login');
    }
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    closeModal();
  };

  const modal = (
    <Modal isTitle={true} onClose={closeModal} title={''}>
      {!state.loadingOrder && <OrderDetails></OrderDetails>}
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
                  {(state.ingredientsPrice ? state.ingredientsPrice : 0) +
                    (state.bunPrice ? state.bunPrice : 0)}
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
