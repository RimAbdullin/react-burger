import styles from './ListBurgerIngredients.module.css';
import CardBurgerIngredients from '../card-burger-ingredients/CardBurgerIngredients';

const ListBurgerIngredients = (props) => {
  const modal = () => {
    console.log('123');
    // console.log(e.target.getAttribute('key'));
  };

  return (
    <section>
      <div className={`mt-10 text text_type_main-medium text_color_primary`}>
        <a id={props.id}>{props.title}</a>
      </div>
      <div className={styles.Column}>
        {props.data.map((item) => (
          <CardBurgerIngredients key={item._id} onClick={modal}>
            {item}
          </CardBurgerIngredients>
        ))}
      </div>
    </section>
  );
};

export default ListBurgerIngredients;
