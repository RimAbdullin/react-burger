import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card-burger-constructor/CardBurgerConstructor';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

const ListBurgerConstructor = ({ onDropHandler }) => {
  // Получаем данные из хранилища redux.
  // Выбранную булку и список выбранных ингредиентов для конструктора.
  const { ingredientsConstructor, currentBun } = useSelector(
    (store) => store.ingredients
  );

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    ingredientsConstructor &&
    currentBun && (
      <section>
        {/* Первый элемент булки. */}
        <CardBurgerConstructor
          extraClass={'mb-4 ml-15'}
          type={'top'}
          isLocked={true}
        >
          {currentBun}
        </CardBurgerConstructor>
        <section
          className={`mb-4 custom-scroll ${styles['Scroll-area']}`}
          ref={dropTarget}
        >
          {/* Список ингредиентов. */}
          {ingredientsConstructor.map((item, index) => (
            <CardBurgerConstructor
              extraClass={
                index !== ingredientsConstructor.length - 1 ? 'mb-4' : ''
              }
              key={item.id}
              type={undefined}
              isLocked={false}
            >
              {item.ingredient}
            </CardBurgerConstructor>
          ))}
        </section>
        {/* Последний элемент булки. */}
        <CardBurgerConstructor
          extraClass={'ml-15'}
          type={'bottom'}
          isLocked={true}
        >
          {currentBun}
        </CardBurgerConstructor>
      </section>
    )
  );
};

export default ListBurgerConstructor;
