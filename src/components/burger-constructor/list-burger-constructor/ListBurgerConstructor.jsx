import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card-burger-constructor/CardBurgerConstructor';
import PropTypes from 'prop-types';
import { burgerIngredientsObject } from '../../../utils/prop-types';

const ListBurgerConstructor = ({ data, bun }) => {
  return (
    <section>
      {/* Первый элемент булки. */}
      <CardBurgerConstructor
        extraClass={'mb-4 ml-15'}
        type={'top'}
        isLocked={true}
      >
        {bun}
      </CardBurgerConstructor>
      <section className={`mb-4 custom-scroll ${styles['Scroll-area']}`}>
        {/* Список ингредиентов. */}
        {data.map((item, index) => (
          <CardBurgerConstructor
            extraClass={index !== data.length - 1 ? 'mb-4' : ''}
            key={item._id}
            type={undefined}
            isLocked={false}
          >
            {item}
          </CardBurgerConstructor>
        ))}
      </section>
      {/* Последний элемент булки. */}
      <CardBurgerConstructor
        extraClass={'ml-15'}
        type={'bottom'}
        isLocked={true}
      >
        {bun}
      </CardBurgerConstructor>
    </section>
  );
};

export default ListBurgerConstructor;

ListBurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(burgerIngredientsObject).isRequired)
    .isRequired,
  bun: PropTypes.shape(burgerIngredientsObject).isRequired,
};
