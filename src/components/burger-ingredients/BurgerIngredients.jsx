import { useState, useRef } from 'react';
import styles from './BurgerIngredients.module.css';
import TabsBurgerIngredients from './tabs-burger-ingredients/TabsBurgerIngredients';
import ListBurgerIngredients from './list-burger-ingredients/ListBurgerIngredients.jsx';
import { useSelector } from 'react-redux';
import { getIngredientsSelector } from '../../services/selectors/selector';

function BurgerIngredients() {
  // Получаем данные из хранилища redux.
  const { bun, main, sauce, itemsFailed, itemsRequest } = useSelector(
    getIngredientsSelector
  );

  const [selectedTab, setSelectedTab] = useState('id-bun');

  // Прокрутка списка ингредиентов до выбранного в Таб элемента.
  const scrollToElement = (v) => {
    const elem = document.getElementById(v);
    elem.scrollIntoView();
  };

  // Устанавливаем наблюдатель за булками.
  const bunRef = useRef();
  const mainRef = useRef();
  const sauceRef = useRef();

  // Переключение табов в зависимости от позиции прокрутки списка.
  const scrollList = () => {
    const topBun = bunRef.current.getBoundingClientRect().top;
    const topMain = mainRef.current.getBoundingClientRect().top;
    const topSauce = sauceRef.current.getBoundingClientRect().top;

    if (topBun < 350) {
      setSelectedTab('id-bun');
    }

    if (topSauce < 350) {
      setSelectedTab('id-sauce');
    }

    if (topMain < 350) {
      setSelectedTab('id-main');
    }
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
      <div
        className={`mt-10 mb-5 text text_type_main-large text_color_primary ${styles.Title}`}
      >
        Соберите бургер
      </div>
      <TabsBurgerIngredients
        selectedTab={selectedTab}
        click={scrollToElement}
      />
      <div
        // ref={scrollRef}
        className={`custom-scroll ${styles['Scroll-area']}`}
        onScroll={scrollList}
      >
        <div>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-bun'} ref={bunRef}>
              Булки
            </a>
          </div>
          <ListBurgerIngredients data={bun}></ListBurgerIngredients>
        </div>
        <div>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-sauce'} ref={sauceRef}>
              Соусы
            </a>
          </div>
          <ListBurgerIngredients data={sauce}></ListBurgerIngredients>
        </div>
        <div>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-main'} ref={mainRef}>
              Начинка
            </a>
          </div>
          <ListBurgerIngredients data={main}></ListBurgerIngredients>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
