import { useState, useEffect } from 'react';
import styles from './CardBurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';
import { deleteItem } from '../../../services/actions/ingredients';

function CardBurgerConstructor({ type, children, isLocked, extraClass }) {
  const [state, setState] = useState({
    name: '',
    loading: true,
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
    dispatch(deleteItem(children));
  };

  return (
    !state.loading && (
      <section className={`ml-4  ${styles['Card-ingredients']}`}>
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

CardBurgerConstructor.propTypes = {
  type: PropTypes.string || undefined,
  isLocked: PropTypes.bool.isRequired,
  extraClass: PropTypes.string.isRequired,
  children: PropTypes.shape(burgerIngredientsObject).isRequired,
};
