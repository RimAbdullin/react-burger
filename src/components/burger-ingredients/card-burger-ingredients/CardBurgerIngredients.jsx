import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CardBurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../../modal/Modal';
import { useModal } from '../../../hooks/useModal';
import { useDispatch } from 'react-redux';
import {
  addItem,
  clearItem,
  selectItem,
} from '../../../services/actions/ingredients';
import { useDrag } from 'react-dnd';

function CardBurgerIngredients({ children }) {
  const { _id } = children;

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { isModalOpen, openModal, closeModal } = useModal();

  const dispatch = useDispatch();

  const handleClickOpenModal = () => {
    dispatch(selectItem(children));
    openModal();
  };

  const handleClickCloseModal = () => {
    dispatch(clearItem());
    closeModal();
  };

  const modal = (
    <Modal onClose={handleClickCloseModal} title={'Детали ингредиента'}>
      <IngredientDetails>{children}</IngredientDetails>
    </Modal>
  );

  return (
    <>
      <section
        className={`ml-4 mb-10 mt-6 ${styles['Card-ingredients']}`}
        onClick={handleClickOpenModal}
      >
        <Counter extraClass={`${styles['Counter']}`} count={1} size="default" />
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
        {isModalOpen && modal}
      </section>
    </>
  );
}

export default CardBurgerIngredients;

CardBurgerIngredients.propTypes = {
  children: PropTypes.shape(burgerIngredientsObject).isRequired,
};
