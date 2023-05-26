import { useState, useEffect } from 'react';
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

function CardBurgerConstructor({ type, children, isLocked, extraClass }) {
  const [state, setState] = useState({
    name: '',
    loading: true,
  });

  const { id } = children;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredientConstructor',
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

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

  return (
    !state.loading &&
    !isDrag && (
      <section className={`ml-4  ${styles['Card-ingredients']}`} ref={dragRef}>
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
