import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CardBurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getIngredientsSelector } from '../../../services/selectors/selector';
import { useLocation, Link } from 'react-router-dom';

function CardBurgerIngredients({ children }) {
  const location = useLocation();

  const { _id } = children;

  const [count, setCount] = useState(0);

  // Получаем данные из хранилища redux.
  // Значение счетчика выбранного ингредиента.
  const { ingredients } = useSelector(getIngredientsSelector);

  // Изменяем количество выбранных ингредиентов.
  useEffect(() => {
    const count = ingredients.filter((item) => item._id === _id)[0].count;
    setCount(count);
  }, [ingredients]);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: children,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

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
          <Counter
            extraClass={`${styles['Counter']}`}
            count={count}
            size="default"
          />
          <div className={`mr-4 ml-4 ${styles['Illustration']}`}>
            <img
              ref={dragRef}
              src={children.image}
              className={`ml-4 mb-10 mt-6 ${styles['Image']}`}
              alt=""
            />
          </div>
          <div className={`mt-1 mb-1 ${styles.Price}`}>
            <span className={`mr-2 text_type_digits-default`}>
              {children.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <span className={`text_type_main-default ${styles.Name}`}>
            {children.name}
          </span>
        </section>
      </>
    </Link>
  );
}

export default CardBurgerIngredients;

CardBurgerIngredients.propTypes = {
  children: PropTypes.shape(burgerIngredientsObject).isRequired,
};
