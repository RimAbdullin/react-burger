import { useState, useEffect, useRef } from 'react';
import styles from './CardBurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';
import { DELETE_ITEM_CONSTRUCTOR } from '../../../services/actions/ingredients';
import { useDrop, useDrag } from 'react-dnd';

function CardBurgerConstructor({
  // id,
  index,
  moveCard,
  type,
  children,
  isLocked,
  extraClass,
}) {
  console.log(children);

  const [state, setState] = useState({
    name: '',
    loading: true,
  });

  // const [{ isDrag }, dragRef] = useDrag({
  //   type: 'ingredientConstructor',
  //   item: { id },
  //   collect: (monitor) => ({
  //     isDrag: monitor.isDragging(),
  //   }),
  // });

  useEffect(() => {
    setState({ ...state, loading: true });

    let nameDescription = '';
    if (type === 'top') {
      nameDescription = ' (верх)';
    } else if (type === 'bottom') {
      nameDescription = ' (низ)';
    }

    setState({
      ...state,
      loading: false,
      name: children.name + nameDescription,
    });
  }, [children]);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: DELETE_ITEM_CONSTRUCTOR,
      item: { ...children },
    });
  };

  //****************************************************************************** */
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
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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
    !state.loading && (
      <section
        className={`ml-4  ${styles['Card-ingredients']}`}
        ref={ref}
        data-handler-id={handlerId}
      >
        {!type && <DragIcon type="primary" />}
        <ConstructorElement
          extraClass={'ml-10 mr-2 ' + extraClass}
          key={children._id}
          type={type}
          isLocked={isLocked}
          handleClose={handleClose}
          text={state.name}
          price={children.price}
          thumbnail={children.image}
        />
      </section>
    )
  );
}

export default CardBurgerConstructor;

// CardBurgerConstructor.propTypes = {
//   type: PropTypes.string || undefined,
//   isLocked: PropTypes.bool.isRequired,
//   extraClass: PropTypes.string.isRequired,
//   children: PropTypes.shape(burgerIngredientsObject).isRequired,
// };
