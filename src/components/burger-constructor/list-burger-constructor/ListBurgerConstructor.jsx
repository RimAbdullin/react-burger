import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card-burger-constructor/CardBurgerConstructor';

const ListBurgerConstructor = (props) => {
  const handleClose = () => {
    alert('123');
  };

  return (
    <section>
      <div className={styles.Column}>
        {props.data.map((item, index) => (
          // <ConstructorElement
          //   extraClass="ml-10"
          //   key={item._id}
          //   type={
          //     index === 0
          //       ? 'top'
          //       : index === props.data.length - 1
          //       ? 'bottom'
          //       : undefined
          //   }
          //   isLocked={false}
          //   handleClose={handleClose}
          //   text={item.name}
          //   price={item.price}
          //   thumbnail={item.image}
          // />
          <CardBurgerConstructor
            test={1}
            key={item._id}
            type={
              index === 0
                ? 'top'
                : index === props.data.length - 1
                ? 'bottom'
                : undefined
            }
          >
            {item}
          </CardBurgerConstructor>
        ))}
      </div>
    </section>
  );
};

export default ListBurgerConstructor;

{
  /* <section>
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
    </section> */
}
