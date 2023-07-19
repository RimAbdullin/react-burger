import styles from './FeedOrderDetails.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import {
  getFeedWSSelector,
  getIngredientsSelector,
} from '../../../../services/selectors/selector';
import { IBurgerIngredient } from '../../../../services/common/interfaces';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCookie, getDateToString } from '../../../../services/common/common';
import { useAppDispatch } from '../../../../hooks/hooks';
import { NORMA_API_WS } from '../../../../data/data';
import { feedWsActions } from '../../../../services/store/types/feedWsActions';

interface IItemFeedDetails {
  ingredients: IBurgerIngredient[];
  name?: string;
  _id?: string;
  status?: string;
  number?: number;
  createdAt?: string;
  updatedAt?: string;
  sum?: number;
}

interface IFeedOrderDetailsProps {
  modal: boolean;
}

export const FeedOrderDetails: React.FC<IFeedOrderDetailsProps> = ({
  modal,
}) => {
  const params = useParams();
  const { _id } = params;

  const [orderData, setOrderData] = useState<IItemFeedDetails>();

  // Получаем данные из хранилища redux.
  // Список ингредиентов.
  const { ingredients } = useTypedSelector(getIngredientsSelector);
  const { error, messages, wsConnected } = useTypedSelector(getFeedWSSelector);

  const accessToken = getCookie('accessToken');
  let token = '';
  if (accessToken) {
    token = accessToken.split(' ')[1];
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Открытие wev socket.
    if (!wsConnected) {
      dispatch({
        type: feedWsActions.wsInit,
        payload: NORMA_API_WS,
      });
    }

    return () => {
      if (!modal) {
        // Закрытие web socket.
        dispatch({
          type: feedWsActions.wsClose,
          payload: '',
        });
      }
    };
  }, []);

  useEffect(() => {
    if (ingredients && messages && messages.orders && messages.orders.length) {
      let orderDataObj: IItemFeedDetails = { ingredients: [] };
      let orderDataDestObj: IItemFeedDetails = { ingredients: [] };

      // Ищем по id заказ в массиве orders из messages.
      const itemOrders = messages.orders.find((item) => item._id === _id);

      // Если заказ найден.
      if (itemOrders) {
        orderDataObj.number = itemOrders.number;
        orderDataObj.name = itemOrders.name;
        orderDataObj.createdAt = itemOrders.createdAt;
        orderDataObj.status = itemOrders.status;

        // Ищем ингредиенты входящие в заказ в массиве ingredients.
        itemOrders.ingredients.map((itemOrders) => {
          const foundIngredients = ingredients.find(
            (itemIngredients) => itemIngredients._id === itemOrders
          );

          if (foundIngredients) {
            orderDataObj.ingredients.push(foundIngredients);
          }
        });
      }

      orderDataDestObj = { ...orderDataObj };
      orderDataDestObj.ingredients = [];

      let sum = 0;

      orderDataObj.ingredients.map((itemSource) => {
        const found = orderDataDestObj.ingredients.find(
          (item) => item._id === itemSource._id
        );

        if (!found) {
          const filter = orderDataObj.ingredients.filter(
            (item) => item._id === itemSource._id
          );

          const newItem = { ...itemSource };
          newItem.count = filter.length;

          sum = sum + newItem.count * newItem.price;

          orderDataDestObj.ingredients.push(newItem);
        }
      });

      orderDataDestObj.sum = sum;

      setOrderData(orderDataDestObj);
    }
  }, [ingredients, messages]);

  const classList = modal ? '' : `${styles['Page-content']}`;

  return (
    <>
      {orderData && (
        <section className={classList}>
          <div className={`${styles['Modal-content']}`}>
            {/* Номер. */}
            <div className={`mb-10 ${styles['Number-container']}`}>
              <span className="text_type_digits-default">
                {'#' + orderData.number}
              </span>
            </div>

            {/* Информация. */}
            <div className={`mb-15 ${styles['Info-container']}`}>
              <div className={`mb-3 ${styles['Name-container']}`}>
                <span className="text text_type_main-medium">
                  {orderData.name}
                </span>
              </div>

              <div className={`${styles['Status-container']}`}>
                <span className="text_type_main-default">
                  {orderData.status === 'done' ? 'Готов' : 'Выполняется'}
                </span>
              </div>
            </div>

            {/* Область для списка ингредиентов. */}
            <div className={`mb-10 ${styles['Ingredients-container']}`}>
              {/* Заголовок списка. */}
              <div className={`mb-6 ${styles['Name-container']}`}>
                <span className="text text_type_main-medium">Состав:</span>
              </div>
              <div className={`custom-scroll ${styles['Scroll-area']}`}>
                {/* Список. */}
                <div className={`${styles['List-container']}`}>
                  {orderData.ingredients.map((item) => (
                    // Элемент списка.
                    <div
                      className={`mb-4 ${styles['List-item-container']}`}
                      key={item._id}
                    >
                      {/* Изображение элемента. */}
                      <div className={`mr-4 ${styles['Image-container']}`}>
                        <img
                          className={`${styles['Image']}`}
                          src={item.image}
                          alt=""
                        ></img>
                      </div>

                      {/* Наименование элемента. */}
                      <div className={`${styles['Item-name-container']}`}>
                        <span className="text text_type_main-default">
                          {item.name}
                        </span>
                      </div>

                      {/* Количество и цена элемента. */}
                      <div className={`mr-2 ${styles['Item-price-container']}`}>
                        <span className="text text_type_digits-default">
                          {item.count + ' x ' + item.price}
                        </span>
                      </div>

                      {/* Иконка для стоимости. */}
                      <div className={`${styles['Price-icon-container']}`}>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Область для времени и стоимости. */}
            <div className={`mb-6 ${styles['Time-price-container']}`}>
              {/* Время. */}
              <div className={`${styles['Time-container']}`}>
                <span className="text_color_inactive text text_type_main-default">
                  {getDateToString(
                    orderData.createdAt ? orderData.createdAt : ''
                  )}
                </span>
              </div>

              {/* Стоимость. */}
              <div
                className={`custom-scroll mr-2 ${styles['Price-container']}`}
              >
                <span className="text text_type_digits-default">
                  {orderData.sum}
                </span>
              </div>

              {/* Иконка для стоимости. */}
              <div className={`${styles['Price-icon-container']}`}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default FeedOrderDetails;
