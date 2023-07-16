import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CardFeedOrder.module.css';
import { FC, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IFeedOrderData } from '../../../../services/common/interfaces';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import { getIngredientsSelector } from '../../../../services/selectors/selector';
import { getDateToString } from '../../../../services/common/common';

interface ICardFeedOrderProps {
  children: IFeedOrderData;
  path: 'feed' | 'profile';
}

const CardFeedOrder: FC<ICardFeedOrderProps> = ({ path, children }) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(getDateToString(children.createdAt));
  }, []);

  const location = useLocation();

  const { _id } = children;

  // Получаем данные из хранилища redux.
  // Список ингредиентов.
  const { ingredients } = useTypedSelector(getIngredientsSelector);

  const getIngredients = (_id: string) => {
    return ingredients.find((item) => {
      if (item._id === _id) {
        return item.image;
      }
    });
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalIngredients, setTotalIngredients] = useState(0);

  useEffect(() => {
    let price = 0;

    children.ingredients.map((item) => {
      const found = ingredients.find((itemIngredients) => {
        if (itemIngredients._id === item) {
          return itemIngredients.price;
        }
      });

      if (found) {
        price = price + found.price;
      }
    });

    setTotalIngredients(children.ingredients.length);

    setTotalPrice(price);
  }, []);

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '64px',
    height: '64px',
    boxSizing: 'border-box',
  };

  const [pathRoute, setPathRoute] = useState('');

  useEffect(() => {
    if (path === 'feed') {
      setPathRoute(`/feed/${_id}`);
    } else {
      setPathRoute(`/profile/orders/${_id}`);
    }
  }, [path]);

  return (
    <Link
      key={_id}
      to={{
        pathname: pathRoute,
      }}
      state={{ background: location }}
    >
      <>
        <section className={`mb-4 ${styles['Card-ingredients']}`}>
          {/* Id и дата. */}
          <div className={`mt-6 ${styles['Order-id-container']}`}>
            {/* Id */}
            <div className={`${styles['Id-container']}`}>
              <span className="text text_type_digits-default text_color_primary">
                {'#' + children.number}
              </span>
            </div>

            {/* Дата */}
            <div className={`${styles['Date-container']}`}>
              <span className="text text_type_main-default text_color_inactive">
                {date}
              </span>
            </div>
          </div>
          {/* Наименование */}
          <div className={`mt-6 ${styles['Name-container']}`}>
            <span className="text_type_main-medium text_color_primary">
              {children.name}
            </span>
          </div>

          {/* Компоненты и цена. */}
          <div className={`mt-6 mb-6 ${styles['Components-container']}`}>
            {/* Ингредиенты. */}
            <div className={`${styles['Ingredients-container']}`}>
              {children.ingredients.map((item, index) =>
                index <= 5 ? (
                  <div
                    key={index}
                    style={{
                      ...listStyle,
                      ...{ zIndex: -index },
                      ...{
                        marginLeft: index === 0 ? '0px' : '-24px',
                        background: '#1C1C21',
                        border: '1px solid #801ab2',
                      },
                    }}
                  >
                    <img
                      className={`${styles['Image']}`}
                      src={
                        getIngredients(item)?.image
                          ? getIngredients(item)?.image
                          : ''
                      }
                      alt=""
                    ></img>
                  </div>
                ) : index === 6 ? (
                  <div
                    key={index}
                    style={{
                      ...listStyle,
                      ...{
                        zIndex: 100,
                        marginLeft: '-62px',
                      },
                    }}
                  >
                    <span className="text text_type_main-default text_color_primary">
                      {'+' + (totalIngredients - 6).toString()}
                    </span>
                  </div>
                ) : (
                  <div key={index}></div>
                )
              )}
            </div>

            {/* Стоимость */}
            <div className={`${styles['Price-container']}`}>
              <span
                className={`mr-2 text text_type_digits-default text_color_primary ${styles['Price']}`}
              >
                {totalPrice}
              </span>
              <div className={`${styles['Icon-container']}`}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </section>
      </>
    </Link>
  );
};

export default CardFeedOrder;
