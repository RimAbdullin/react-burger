import styles from './IngredientDetails.module.css';
import { useEffect } from 'react';
import { getIngredientsSelector } from '../../../services/selectors/selector';
import { getIngredientsItemsThunk } from '../../../services/actions/ingredients';

import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { IngredientsActionTypes } from '../../../services/store/types/ingredients';
import { useAppDispatch } from '../../../hooks/hooks';

interface IIngredientDetailsProps {
  modal: boolean;
}

export const IngredientDetails: React.FC<IIngredientDetailsProps> = ({
  modal,
}) => {
  const params = useParams();

  const { _id } = params;

  // Получаем данные из хранилища redux.
  // Выбранный ингредиент для отображения детальных данных.
  const { currentIngredient, ingredients } = useTypedSelector(
    getIngredientsSelector
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!ingredients) {
      dispatch(getIngredientsItemsThunk('Краторная булка N-200i'));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: IngredientsActionTypes.GET_ITEM,
      id: _id ? _id : '',
    });
  }, [dispatch, ingredients]);

  const classList = modal ? '' : `${styles['Page-content']}`;

  return (
    currentIngredient && (
      <>
        <section className={classList}>
          <div className={`${styles['Modal-content']}`}>
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
          </div>
        </section>
      </>
    )
  );
};

export default IngredientDetails;
