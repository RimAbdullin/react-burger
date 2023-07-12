import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CardFeedOrder.module.css';
import { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IFeedOrderData } from '../../../../services/common/interfaces';

interface ICardFeedOrderProps {
  children: IFeedOrderData;
}

const CardFeedOrder: FC<ICardFeedOrderProps> = ({ children }) => {
  const location = useLocation();

  // const { _id } = children.orders;
  const _id = 1;

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
        <section className={`ml-4 mb-10 mt-6 ${styles['Card-ingredients']}`}>
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
