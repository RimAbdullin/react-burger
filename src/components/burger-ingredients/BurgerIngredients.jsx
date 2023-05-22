import styles from './BurgerIngredients.module.css';
import TabsBurgerIngredients from './tabs-burger-ingredients/TabsBurgerIngredients';
import ListBurgerIngredients from './list-burger-ingredients/ListBurgerIngredients.jsx';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  // Получаем данные из хранилища redux.
  const { bun, main, sauce, itemsFailed, itemsRequest } = useSelector(
    (store) => store.ingredients
  );

  const scrollToElement = (v) => {
    const elem = document.getElementById(v);
    elem.scrollIntoView();
  };

  return itemsRequest ? (
    <section className={styles['Info-container']}>
      <p>Идет загрузка ...</p>
    </section>
  ) : itemsFailed ? (
    <section className={styles['Info-container']}>
      <h1>Данные не найдены.</h1>
    </section>
  ) : (
    <section className={`${styles.Container}`}>
      <section
        className={`mt-10 mb-5 text text_type_main-large text_color_primary ${styles.Title}`}
      >
        Соберите бургер
      </section>
      <TabsBurgerIngredients click={scrollToElement} />
      <section className={`custom-scroll ${styles['Scroll-area']}`}>
        <ListBurgerIngredients
          id={'id-bun'}
          title={'Булки'}
          data={bun}
        ></ListBurgerIngredients>
        <ListBurgerIngredients
          id={'id-sauce'}
          title={'Соусы'}
          data={sauce}
        ></ListBurgerIngredients>
        <ListBurgerIngredients
          id={'id-main'}
          title={'Начинка'}
          data={main}
        ></ListBurgerIngredients>
      </section>
    </section>
  );
}

export default BurgerIngredients;
