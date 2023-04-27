import styles from './CardBurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import Modal from '../../modal/Modal';
import PropTypes from 'prop-types';

function CardBurgerConstructor(props) {
  const data = props.children;

  const [modal, setModal] = useState(false);

  return (
    <>
      <section
        className={`ml-4  ${styles['Card-ingredients']} ${styles['Card-border']}`}
        onClick={() => setModal(true)}
      >
        <div
          className={`${styles['Drag-icon-container']} ${styles['Card-border']}`}
        >
          <DragIcon type="primary" />
        </div>
        {/* Контейнер для данных. */}
        <div className={`${styles['Card-data']}`}>
          <ConstructorElement
            extraClass="ml-10"
            key={data._id}
            type={props.type}
            isLocked={false}
            // handleClose={handleClose}
            text={data.name}
            price={data.price}
            thumbnail={data.image}
          />
        </div>

        {/* <Modal visible={modal} setVisible={setModal}>
        {data.name}
      </Modal> */}
      </section>
    </>
  );
}

export default CardBurgerConstructor;

CardBurgerConstructor.propTypes = {
  test: PropTypes.string,
};
