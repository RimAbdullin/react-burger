import { useSelector } from 'react-redux';
import styles from './IngredientDetails.module.css';

const IngredientDetails = () => {
  // Получаем данные из хранилища redux.
  // Выбранный ингредиент для отображения детальных данных.
  const { currentIngredient } = useSelector((store) => store.modal);

  return (
    currentIngredient && (
      <>
        <section className={`${styles['Modal-content']}`}>
          {/* Изображение. */}
          <section className={`${styles['Image']}`}>
            <img
              className={`${styles['Illustration']}`}
              src={currentIngredient.image}
              alt=""
            ></img>
          </section>
          {/* Наименование */}
          <span className="mt-4 text_type_main-medium">
            {currentIngredient.name}
          </span>
          {/* Питание. */}
          <section className={`mt-8 mb-15 ${styles['Nutrition-container']}`}>
            <section className={`mr-5 ${styles['Value-container-calories']}`}>
              <section className={`mb-2 ${styles['Value-calories']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Калории,ккал
                </span>
              </section>
              <section className={`${styles['Value-calories']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.calories}
                </span>
              </section>
            </section>

            <section className={`mr-5 ${styles['Value-container']}`}>
              <section className={`mb-2 ${styles['Value']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Белки, г
                </span>
              </section>
              <section className={`${styles['Value']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.proteins}
                </span>
              </section>
            </section>

            <section className={`mr-5 ${styles['Value-container']}`}>
              <section className={`mb-2 ${styles['Value']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Жиры, г
                </span>
              </section>
              <section className={`${styles['Value']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.fat}
                </span>
              </section>
            </section>

            <section className={`${styles['Value-container']}`}>
              <section className={`mb-2 ${styles['Value']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Углеводы, г
                </span>
              </section>
              <section className={`${styles['Value']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.carbohydrates}
                </span>
              </section>
            </section>
          </section>
        </section>
      </>
    )
  );
};

export default IngredientDetails;
