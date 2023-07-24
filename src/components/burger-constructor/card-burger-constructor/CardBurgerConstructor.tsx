import { FC, useRef } from 'react';
import styles from './CardBurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import { IBurgerIngredient } from '../../../services/common/interfaces';
import { IngredientsActionTypes } from '../../../services/store/types/ingredients';
import { useAppDispatch } from '../../../hooks/hooks';
import { IngredientsConstructorActionTypes } from '../../../services/store/types/ingredientsConstructor';

interface ICardBurgerConstructorProps {
  index: number;
  children: IBurgerIngredient;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  extraClass: string;
}

const CardBurgerConstructor: FC<ICardBurgerConstructorProps> = ({
  index,
  children,
  moveCard,
  extraClass,
}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch({
      type: IngredientsConstructorActionTypes.DELETE_ITEM_CONSTRUCTOR,
      item: { ...children },
    });
  };

  const { id } = children;

  const ref = useRef<HTMLElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor): void {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset: any = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <section
      className={`ml-4  ${styles['Card-ingredients']}`}
      ref={ref}
      data-handler-id={handlerId}
    >
      {<DragIcon type="primary" />}
      <ConstructorElement
        extraClass={'ml-10 mr-2 ' + extraClass}
        key={children._id}
        type={undefined}
        isLocked={false}
        handleClose={handleClose}
        text={children.name}
        price={children.price}
        thumbnail={children.image}
      />
    </section>
  );
};

export default CardBurgerConstructor;
