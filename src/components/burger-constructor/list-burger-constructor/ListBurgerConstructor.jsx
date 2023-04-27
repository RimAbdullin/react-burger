import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ListBurgerConstructor.module.css';

const ListBurgerConstructor = (props) => {
  const handleClose = () => {
    alert('123');
  };

  return (
    <section>
      <div className={styles.Column}>
        {props.data.map((item, index) => (
          <ConstructorElement
            extraClass="ml-10"
            key={item._id}
            type={
              index === 0
                ? 'top'
                : index === props.data.length - 1
                ? 'bottom'
                : undefined
            }
            isLocked={false}
            handleClose={handleClose}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ListBurgerConstructor;
