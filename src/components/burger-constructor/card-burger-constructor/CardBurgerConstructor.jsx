import { useRef } from 'react';
import styles from './CardBurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { burgerIngredientsConstructorObject } from '../../../utils/prop-types';
import { DELETE_ITEM_CONSTRUCTOR } from '../../../services/actions/ingredients';
import { useDrop, useDrag } from 'react-dnd';

function CardBurgerConstructor({ index, children, moveCard, extraClass }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: DELETE_ITEM_CONSTRUCTOR,
      item: { ...children },
    });
  };

  const { id } = children;

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
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

      const clientOffset = monitor.getClientOffset();

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
}

export default CardBurgerConstructor;

CardBurgerConstructor.propTypes = {
  index: PropTypes.number.isRequired,
  extraClass: PropTypes.string.isRequired,
  children: PropTypes.shape(burgerIngredientsConstructorObject).isRequired,
  moveCard: PropTypes.func.isRequired,
};
