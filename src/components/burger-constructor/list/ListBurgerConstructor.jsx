import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card/CardBurgerConstructor';

const ListBurgerConstructor = (props) => {
  return (
    <section>
      <div className={styles.Column}>
        {props.data.map((item) => (
          <CardBurgerConstructor key={item._id}>{item}</CardBurgerConstructor>
        ))}
      </div>
    </section>
  );
};

export default ListBurgerConstructor;
