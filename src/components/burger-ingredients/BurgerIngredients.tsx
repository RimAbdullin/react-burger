import { useState, useRef } from 'react';
import styles from './BurgerIngredients.module.css';
import TabsBurgerIngredients from './tabs-burger-ingredients/TabsBurgerIngredients';
import { ListBurgerIngredients } from './list-burger-ingredients/ListBurgerIngredients';
import { getIngredientsSelector } from '../../services/selectors/selector';
import { useTypedSelector } from '../../hooks/useTypeSelector';

function BurgerIngredients() {
  // Получаем данные из хранилища redux.
  const { bun, main, sauce, itemsFailed, itemsRequest } = useTypedSelector(
    getIngredientsSelector
  );

  const [selectedTab, setSelectedTab] = useState('id-bun');

  // Прокрутка списка ингредиентов до выбранного в Таб элемента.
  const scrollToElement = (v: string) => {
    const elem = document.getElementById(v);
    if (elem) {
      elem.scrollIntoView();
    }
  };

  // Устанавливаем наблюдатель за булками.
  const bunRef = useRef<HTMLAnchorElement>(null);
  const mainRef = useRef<HTMLAnchorElement>(null);
  const sauceRef = useRef<HTMLAnchorElement>(null);

  // Переключение табов в зависимости от позиции прокрутки списка.
  const scrollList = () => {
    const topBun = bunRef?.current?.getBoundingClientRect().top;
    const topMain = mainRef?.current?.getBoundingClientRect().top;
    const topSauce = sauceRef?.current?.getBoundingClientRect().top;

    if (topBun && topBun < 350) {
      setSelectedTab('id-bun');
    }

    if (topSauce && topSauce < 350) {
      setSelectedTab('id-sauce');
    }

    if (topMain && topMain < 350) {
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
        className={`custom-scroll ${styles['Scroll-area']}`}
        onScroll={scrollList}
        data-cy="ingredients"
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
