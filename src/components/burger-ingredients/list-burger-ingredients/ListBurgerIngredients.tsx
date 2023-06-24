import styles from './ListBurgerIngredients.module.css';
import CardBurgerIngredients from '../card-burger-ingredients/CardBurgerIngredients';
import { IBurgerIngredient } from '../../../services/common/interfaces';

interface IListBurgerIngredientsProps {
  data: IBurgerIngredient[];
}

const ListBurgerIngredients: React.FC<IListBurgerIngredientsProps> = ({
  data,
}) => {
  return (
    <section>
      <div className={styles['List-container']}>
        {data.map((item) => (
          <CardBurgerIngredients key={item._id}>{item}</CardBurgerIngredients>
        ))}
      </div>
    </section>
  );
};

export default ListBurgerIngredients;
