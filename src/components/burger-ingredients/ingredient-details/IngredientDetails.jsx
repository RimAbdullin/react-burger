import { useSelector } from 'react-redux';
import styles from './IngredientDetails.module.css';
import { getModalSelector } from '../../../services/selectors/selector';

const IngredientDetails = () => {
  // Получаем данные из хранилища redux.
  // Выбранный ингредиент для отображения детальных данных.
  const { currentIngredient } = useSelector(getModalSelector);

  console.log(currentIngredient);

  return (
    currentIngredient && (
      <>
        <section className={`${styles['Modal-content']}`}>
          {/* Изображение. */}
          <div className={`${styles['Image']}`}>
            <img
              className={`${styles['Illustration']}`}
              src={currentIngredient.image}
              alt=""
            ></img>
          </div>
          {/* Наименование */}
          <span className="mt-4 text_type_main-medium">
            {currentIngredient.name}
          </span>
          {/* Питание. */}
          <div className={`mt-8 mb-15 ${styles['Nutrition-container']}`}>
            <div className={`mr-5 ${styles['Value-container-calories']}`}>
              <div className={`mb-2 ${styles['Value-calories']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Калории,ккал
                </span>
              </div>
              <div className={`${styles['Value-calories']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.calories}
                </span>
              </div>
            </div>

            <div className={`mr-5 ${styles['Value-container']}`}>
              <div className={`mb-2 ${styles['Value']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Белки, г
                </span>
              </div>
              <div className={`${styles['Value']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.proteins}
                </span>
              </div>
            </div>

            <div className={`mr-5 ${styles['Value-container']}`}>
              <div className={`mb-2 ${styles['Value']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Жиры, г
                </span>
              </div>
              <div className={`${styles['Value']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.fat}
                </span>
              </div>
            </div>

            <div className={`${styles['Value-container']}`}>
              <div className={`mb-2 ${styles['Value']}`}>
                <span className="text text_type_main-default text_color_inactive">
                  Углеводы, г
                </span>
              </div>
              <div className={`${styles['Value']}`}>
                <span className="text text_type_digits-default text_color_inactive">
                  {currentIngredient.carbohydrates}
                </span>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default IngredientDetails;
