import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CardFeedOrder.module.css';
import { FC, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IFeedOrderData } from '../../../../services/common/interfaces';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import { getIngredientsItems } from '../../../../services/actions/ingredients';
import { getIngredientsSelector } from '../../../../services/selectors/selector';

interface ICardFeedOrderProps {
  children: IFeedOrderData;
}

const CardFeedOrder: FC<ICardFeedOrderProps> = ({ children }) => {
  const [date, setDate] = useState('');

  const dropHMS = (date: Date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
  };

  const dayTitle = (number: number): string => {
    if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'дней';
    const last_num = number % 10;
    if (last_num == 1) return 'день';
    if ([2, 3, 4].includes(last_num)) return 'дня';
    if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'дней';
    return '';
  };

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    dropHMS(today);
    dropHMS(yesterday);

    const dateMessageParse = Date.parse(children.createdAt);

    const dateMessage = new Date(dateMessageParse);

    let dateMessageMatch = new Date(dateMessage);
    dropHMS(dateMessageMatch);

    if (dateMessageMatch.getTime() === today.getTime()) {
      setDate(
        'Сегодня, ' + dateMessage.getHours() + ':' + dateMessage.getMinutes()
      );
    } else if (dateMessageMatch.getTime() === yesterday.getTime()) {
      setDate(
        'Вчера, ' + dateMessage.getHours() + ':' + dateMessage.getMinutes()
      );
    } else {
      const timeDiff = Math.abs(today.getTime() - dateMessage.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const message =
        diffDays +
        ' ' +
        dayTitle(diffDays) +
        ' назад ' +
        dateMessage.getHours() +
        ':' +
        dateMessage.getMinutes();

      setDate(message);
    }
  }, []);

  const location = useLocation();

  const { _id } = children;

  // Получаем данные из хранилища redux.
  // Значение счетчика выбранного ингредиента.
  const { ingredients } = useTypedSelector(getIngredientsSelector);

  const getIngredients = (_id: string) => {
    return ingredients.find((item) => {
      if (item._id === _id) {
        return item.image;
      }
    });
  };

  return (
    <Link
      key={_id}
      to={{
        pathname: `/ingredients/${_id}`,
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
              {children.ingredients.map((item, index) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: '64px',
                    height: '64px',
                    zIndex: -index,
                    boxSizing: 'border-box',
                    border: '1px solid #801ab2',
                    background: '#1C1C21',
                    marginLeft: index === 0 ? '0px' : '-24px',
                    position: 'relative',
                  }}
                >
                  <img
                    className={`${styles['Image']}`}
                    // style={{
                    //   height: '64px',
                    //   zIndex: index,
                    // }}
                    src={
                      getIngredients(item)?.image
                        ? getIngredients(item)?.image
                        : ''
                    }
                    alt=""
                  ></img>
                </div>
              ))}
            </div>

            {/* Дата */}
            <div className={`${styles['Price-container']}`}>
              <span className="text text_type_main-default text_color_inactive">
                {date}
              </span>
            </div>
          </div>
          {/* <div className={`mr-4 ml-4 ${styles['Illustration']}`}>
            <img
              // src={children.image}
              className={`ml-4 mb-10 mt-6 ${styles['Image']}`}
              alt=""
            />
          </div> */}
          {/* <div className={`mt-1 mb-1 ${styles.Price}`}>
            <span className={`mr-2 text_type_digits-default`}>
            </span>
            <CurrencyIcon type="primary" />
          </div> */}
        </section>
      </>
    </Link>
  );
};

export default CardFeedOrder;
