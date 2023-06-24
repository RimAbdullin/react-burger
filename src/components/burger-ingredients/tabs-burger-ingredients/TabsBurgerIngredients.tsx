import React, { useState, useEffect } from 'react';
import styles from './TabsBurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

interface ITabsBurgerIngredientsProps {
  click: (v: string) => void;
  selectedTab: string;
}

const TabsBurgerIngredients: React.FC<ITabsBurgerIngredientsProps> = ({
  click,
  selectedTab,
}) => {
  const [current, setCurrent] = useState('id-bun');

  const scrollElement = (v: string) => {
    click(v);
    setCurrent(v);
  };

  useEffect(() => {
    setCurrent(selectedTab);
  }, [selectedTab]);

  return (
    <section className={`text text_type_main-default ${styles.Tabs}`}>
      <Tab value="id-bun" active={current === 'id-bun'} onClick={scrollElement}>
        Булки
      </Tab>
      <Tab
        value="id-sauce"
        active={current === 'id-sauce'}
        onClick={scrollElement}
      >
        Соусы
      </Tab>
      <Tab
        value="id-main"
        active={current === 'id-main'}
        onClick={scrollElement}
      >
        Начинки
      </Tab>
    </section>
  );
};

export default TabsBurgerIngredients;

TabsBurgerIngredients.propTypes = {
  click: PropTypes.func.isRequired,
};
