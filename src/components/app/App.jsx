import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { getIngredients } from '../../utils/burger-api';

function App() {
  const [state, setState] = useState({
    error: false,
    burgerData: null,
    loading: true,
  });

  useEffect(() => {
    const getBurgerData = async () => {
      setState({ ...state, loading: true });
      try {
        // Добрый день.
        // Не знаю как по другому получить обратную связь, поэтому напишу вопрос здесь.
        // После 1 промежуточного ревью вы написали замечания, что нужно обрабатывать
        // возможные ошибки в запросе получения данных.
        // Я вроде сделал согласно ваших рекомендаций.
        // Здесь идет вызов функции getIngredients() из отдельного модуля.
        // Эта функция внутри проверяет полученный ответ от сервера, вызывая отдельную
        // функцию checkResponse(), в которой и проверяется статус ответа.
        // Если не res.ok то пробрасывает промис ошибки,
        // которая уже здесь уходит в catch.
        // Во втором ревью опять получил замечание, что нет обработки возможной ошибки
        // ответа от сервера.
        // Подскажите пожалуйста, может я неправильно сделал или еще здесь надо
        // добавить обработку ошибки?
        // Заранее благодарен за ответ.
        const data = await getIngredients();

        setState({
          burgerData: data.data,
          loading: false,
        });
      } catch (err) {
        setState({ ...state, error: true });
      }
    };
    getBurgerData();
  }, []);

  return (
    <>
      <header>
        <AppHeader />
      </header>
      <main>
        {state.error ? (
          <section className={styles['Error-container']}>
            <h1>Данные не найдены.</h1>
          </section>
        ) : (
          !state.loading && (
            <section className={styles[`Main-container`]}>
              <BurgerIngredients data={state.burgerData} />
              <BurgerConstructor data={state.burgerData} />
            </section>
          )
        )}
      </main>
    </>
  );
}

export default App;
