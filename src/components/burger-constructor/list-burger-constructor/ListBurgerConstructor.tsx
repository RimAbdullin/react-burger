import { useCallback, useEffect, useState } from 'react';
import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card-burger-constructor/CardBurgerConstructor';
import { useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {
  getIngredientsConstructorSelector,
  getIngredientsSelector,
} from '../../../services/selectors/selector';

const ListBurgerConstructor = ({ onDropHandler }) => {
  // Получаем данные из хранилища redux.
  // Выбранную булку и список выбранных ингредиентов для конструктора.
  const { ingredientsConstructor } = useSelector(
    getIngredientsConstructorSelector
  );

  const { currentBun } = useSelector(getIngredientsSelector);

  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(ingredientsConstructor);
  }, [ingredientsConstructor]);

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

  const renderCard = useCallback((ingredientsConstructor, index) => {
    return (
      ingredientsConstructor && (
        <CardBurgerConstructor
          extraClass={index !== ingredientsConstructor.length - 1 ? 'mb-4' : ''}
          key={ingredientsConstructor.id}
          index={index}
          id={ingredientsConstructor.id}
          text={ingredientsConstructor.text}
          type={undefined}
          isLocked={false}
          moveCard={moveCard}
        >
          {ingredientsConstructor}
        </CardBurgerConstructor>
      )
    );
  }, []);

  return (
    ingredientsConstructor &&
    currentBun && (
      <section>
        {/* Первый элемент булки. */}
        <div className={`ml-4  ${styles['Card-ingredients']}`}>
          <ConstructorElement
            extraClass={'mb-4 ml-15'}
            type={'top'}
            isLocked={true}
            text={currentBun.name + ' (верх)'}
            price={currentBun.price}
            thumbnail={currentBun.image}
          />
        </div>
        <div
          className={`mb-4 custom-scroll ${styles['Scroll-area']}`}
          ref={dropTarget}
        >
          {/* Список ингредиентов. */}
          {cards.map((card, i) => renderCard(card, i))}
        </div>
        {/* Последний элемент булки. */}
        <div className={`ml-4  ${styles['Card-ingredients']}`}>
          <ConstructorElement
            extraClass={'ml-15'}
            type={'bottom'}
            isLocked={true}
            text={currentBun.name + ' (низ)'}
            price={currentBun.price}
            thumbnail={currentBun.image}
          />
        </div>
      </section>
    )
  );
};

export default ListBurgerConstructor;

ListBurgerConstructor.propTypes = {
  onDropHandler: PropTypes.func.isRequired,
};
