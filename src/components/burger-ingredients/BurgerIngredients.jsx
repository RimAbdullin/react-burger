import { useState, useRef, useEffect } from 'react';
import styles from './BurgerIngredients.module.css';
import TabsBurgerIngredients from './tabs-burger-ingredients/TabsBurgerIngredients';
import ListBurgerIngredients from './list-burger-ingredients/ListBurgerIngredients.jsx';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
  // Получаем данные из хранилища redux.
  const { bun, main, sauce, itemsFailed, itemsRequest } = useSelector(
    (store) => store.ingredients
  );

  const [selectedTab, setSelectedTab] = useState('id-bun');

  // Прокрутка списка ингредиентов до выбранного в Таб элемента.
  const scrollToElement = (v) => {
    const elem = document.getElementById(v);
    elem.scrollIntoView();
  };

  const scrollRef = useRef();

  // Устанавливаем наблюдатель за булками.
  const observerBun = useRef();
  const bunRef = useRef();

  useEffect(() => {
    if (itemsRequest) {
      return;
    }
    if (observerBun.current) {
      observerBun.current.disconnect();
    }
    const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
        if (entries[0].intersectionRect.top < 20) {
          console.log('достигли булки');
          setSelectedTab('id-bun');
        }
      }
    };
    const options = {
      root: scrollRef.current,
      rootMargin: '0px',
      // threshold: [0.25, 0.5, 0.75, 1.0],
      threshold: 0,
    };
    observerBun.current = new IntersectionObserver(callback, options);
    observerBun.current.observe(bunRef.current);
  }, [itemsRequest]);

  // Устанавливаем наблюдатель за начинкой.
  const mainRef = useRef();
  const observerMain = useRef();

  useEffect(() => {
    if (itemsRequest) {
      return;
    }
    if (observerMain.current) {
      observerMain.current.disconnect();
    }
    const callback = function (entries, observer) {
      // if (entries[0].intersectionRect.top < 500) {
      //   // console.log('достигли начинки');
      //   // console.log(entries[0].intersectionRect);
      //   setSelectedTab('id-main');
      // }

      if (!entries[0].isIntersecting) {
        console.log('************************');
        console.log('достигли начинки');
        console.log(entries[0].intersectionRect.top);
        setSelectedTab('id-main');
        // if (entries[0].intersectionRect.top < 20) {
        //   console.log('достигли начинки');
        //   setSelectedTab('id-main');
        // }
      }
    };
    const options = {
      root: null,
      rootMargin: '-300px -300px',
      // threshold: [0.1, 0.25, 0.5, 0.6, 0.75, 0.9, 1.0],
      threshold: 1.0,
    };
    observerMain.current = new IntersectionObserver(callback, options);
    observerMain.current.observe(mainRef.current);
  }, [itemsRequest]);

  // Устанавливаем наблюдатель за соусами.
  const observerSauce = useRef();
  const sauceRef = useRef();

  useEffect(() => {
    if (itemsRequest) {
      return;
    }
    if (observerSauce.current) {
      observerSauce.current.disconnect();
    }
    const callback = function (entries, observer) {
      if (entries[0].isIntersecting) {
        if (entries[0].intersectionRect.top < 20) {
          console.log('достигли соусов');
          setSelectedTab('id-sauce');
        }
      }
    };
    const options = {
      root: scrollRef.current,
      rootMargin: '0px',
      // threshold: [0.25, 0.5, 0.75, 1.0],
      threshold: 0,
    };
    observerSauce.current = new IntersectionObserver(callback, options);
    observerSauce.current.observe(sauceRef.current);
  }, [itemsRequest]);

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
      <TabsBurgerIngredients
        selectedTab={selectedTab}
        click={scrollToElement}
      />
      <section
        ref={scrollRef.current}
        className={`custom-scroll ${styles['Scroll-area']}`}
      >
        <section>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-bun'} ref={bunRef}>
              Булки
            </a>
          </div>
          <ListBurgerIngredients data={bun}></ListBurgerIngredients>
        </section>
        <section>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-sauce'} ref={sauceRef}>
              Соусы
            </a>
          </div>
          <ListBurgerIngredients data={sauce}></ListBurgerIngredients>
        </section>
        <section>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-main'} ref={mainRef}>
              Начинка
            </a>
          </div>
          <ListBurgerIngredients data={main}></ListBurgerIngredients>
        </section>
      </section>
    </section>
  );
}

export default BurgerIngredients;
