import { FC, useCallback, useEffect, useState } from 'react';
import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card-burger-constructor/CardBurgerConstructor';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  getIngredientsConstructorSelector,
  getIngredientsSelector,
} from '../../../services/selectors/selector';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { IBurgerIngredient } from '../../../services/common/interfaces';

interface IListBurgerConstructorProps {
  onDropHandler: (item: IBurgerIngredient) => void;
}

const ListBurgerConstructor: FC<IListBurgerConstructorProps> = ({
  onDropHandler,
}) => {
  // Получаем данные из хранилища redux.
  // Выбранную булку и список выбранных ингредиентов для конструктора.
  const { ingredientsConstructor } = useTypedSelector(
    getIngredientsConstructorSelector
  );

  const { currentBun } = useTypedSelector(getIngredientsSelector);

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item: IBurgerIngredient) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [cards, setCards] = useState<IBurgerIngredient[]>([]);

  const [bun, setBun] = useState<boolean>(false);

  useEffect(() => {
    setCards(ingredientsConstructor);
  }, [ingredientsConstructor]);

  useEffect(() => {
    if (currentBun) {
      setBun(true);
    } else {
      setBun(false);
    }
  }, [currentBun]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((card: IBurgerIngredient, index: number) => {
    return (
      ingredientsConstructor && (
        <CardBurgerConstructor
          extraClass={index !== ingredientsConstructor.length - 1 ? 'mb-4' : ''}
          key={card.id}
          index={index}
          moveCard={moveCard}
        >
          {card}
        </CardBurgerConstructor>
      )
    );
  }, []);

  return (
    <section>
      {/* ingredientsConstructor && (currentBun || bun) && ( */}
      {/* Первый элемент булки. */}
      {currentBun && bun && (
        <div
          className={`ml-4  ${styles['Card-ingredients']}`}
          data-cy="constructor-bun-1"
        >
          <ConstructorElement
            extraClass={'mb-4 ml-15'}
            type={'top'}
            isLocked={true}
            text={currentBun.name + ' (верх)'}
            price={currentBun.price}
            thumbnail={currentBun.image}
          />
        </div>
      )}
      <div
        className={`mb-4 custom-scroll ${styles['Scroll-area']}`}
        data-cy="constructor"
        ref={dropTarget}
      >
        {!currentBun && !bun && ingredientsConstructor.length === 0 && (
          <div className={`${styles['Info-container']}`}>
            <span
              className={`ml-4  text text_type_main-medium text_color_primary ${styles['Info']}`}
            >
              Пожалуйста, перенесите сюда булку и ингредиенты для создания
              заказа
            </span>
          </div>
        )}
        {/* Список ингредиентов. */}
        {cards.map((card, i) => renderCard(card, i))}
      </div>
      {/* Последний элемент булки. */}
      {currentBun && bun && (
        <div
          className={`ml-4  ${styles['Card-ingredients']}`}
          data-cy="constructor-bun-2"
        >
          <ConstructorElement
            extraClass={'ml-15'}
            type={'bottom'}
            isLocked={true}
            text={currentBun.name + ' (низ)'}
            price={currentBun.price}
            thumbnail={currentBun.image}
          />
        </div>
      )}
      {/* ) */}
    </section>
  );
};

export default ListBurgerConstructor;
