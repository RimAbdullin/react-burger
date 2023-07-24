import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CardBurgerIngredients.module.css';
import { useDrag } from 'react-dnd';
import { useState, useEffect, FC } from 'react';
import {
  getIngredientsConstructorSelector,
  getIngredientsSelector,
} from '../../../services/selectors/selector';
import { useLocation, Link } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { IBurgerIngredient } from '../../../services/common/interfaces';

interface ICardBurgerIngredientsProps {
  children: IBurgerIngredient;
}

const CardBurgerIngredients: FC<ICardBurgerIngredientsProps> = ({
  children,
}) => {
  const location = useLocation();

  const { _id } = children;

  const [count, setCount] = useState<number>(0);

  // Получаем данные из хранилища redux.
  // Значение счетчика выбранного ингредиента.
  const { ingredientsConstructor } = useTypedSelector(
    getIngredientsConstructorSelector
  );

  const { currentBun } = useTypedSelector(getIngredientsSelector);

  // Изменяем количество выбранных ингредиентов.
  useEffect(() => {
    if (children.type !== 'bun') {
      if (ingredientsConstructor.length > 0) {
        const filter = ingredientsConstructor.filter(
          (item) => item._id === _id
        );

        if (filter.length <= 1) {
          setCount(filter.length);
        }

        if (filter.length > 1) {
          const count = ingredientsConstructor.filter(
            (item) => item._id === _id
          ).length;

          if (count) {
            setCount(count);
          }
        }
      } else {
        setCount(0);
      }
    }
  }, [ingredientsConstructor]);

  useEffect(() => {
    if (
      children.type === 'bun' &&
      currentBun &&
      children._id === currentBun._id
    ) {
      setCount(1);
    } else if (
      children.type === 'bun' &&
      currentBun &&
      children._id !== currentBun._id
    ) {
      setCount(0);
    }
  }, [currentBun]);

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
};

export default CardBurgerIngredients;
