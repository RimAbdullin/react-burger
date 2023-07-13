import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CardFeedOrder.module.css';
import { FC, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IFeedOrderData } from '../../../../services/common/interfaces';

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
      console.log(
        'Сегодня, ' + dateMessage.getHours() + ':' + dateMessage.getMinutes()
      );
    } else if (dateMessageMatch.getTime() === yesterday.getTime()) {
      setDate(
        'Вчера, ' + dateMessage.getHours() + ':' + dateMessage.getMinutes()
      );
      console.log(
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
      console.log(message);
    }
  }, []);

  const location = useLocation();

  const { _id } = children;
  // const _id = 1;

  // Получаем данные из хранилища redux.
  // Значение счетчика выбранного ингредиента.
  // const { ingredientsConstructor } = useTypedSelector(
  //   getIngredientsConstructorSelector
  // );

  return (
    <Link
      key={_id}
      to={{
        pathname: `/ingredients/${_id}`,
      }}
      state={{ background: location }}
    >
      <>
        <section className={`mb-4 mt-6 ${styles['Card-ingredients']}`}>
          <div className={`${styles['Order-id-container']}`}>
            {/* Id */}
            <div className={`${styles['Id-container']}`}>
              <span className="text text_type_digits-default text_color_primary">
                {'#' + children.number}
              </span>
            </div>

            {/* Дата */}
            <div className={`${styles['Date-container']}`}>
              <span className="text text_type_main-default text_color_primary">
                {date}
              </span>
            </div>
          </div>

          <div className={`mr-4 ml-4 ${styles['Illustration']}`}>
            <img
              // src={children.image}
              className={`ml-4 mb-10 mt-6 ${styles['Image']}`}
              alt=""
            />
          </div>
          <div className={`mt-1 mb-1 ${styles.Price}`}>
            <span className={`mr-2 text_type_digits-default`}>
              {/* {children.price} */}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <span className={`text_type_main-default ${styles.Name}`}>
            {/* {children.name} */}
          </span>
        </section>
      </>
    </Link>
  );
};

export default CardFeedOrder;
