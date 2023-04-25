import styles from './ListBurgerConstructor.module.css';
import CardBurgerConstructor from '../card/CardBurgerConstructor';

const ListBurgerConstructor = (props) => {
  return (
    <section>
      <div className={`mt-10 text text_type_main-medium text_color_primary`}>
        <a id={props.id}>{props.title}</a>
      </div>
      <div className={styles.Column}>
        {props.data.map((item) => (
          <CardBurgerConstructor key={item._id}>{item}</CardBurgerConstructor>
        ))}
      </div>
    </section>
  );
};

export default ListBurgerConstructor;
