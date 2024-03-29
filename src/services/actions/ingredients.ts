import { getIngredientsRequest } from '../../utils/burger-api';
import { IngredientsActionTypes } from '../store/types/ingredients';
import { AppDispatch } from '../store/store';

// thunk
export const getIngredientsItemsThunk = (bunName: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: IngredientsActionTypes.GET_ITEMS_REQUEST,
    });
    return getIngredientsRequest()
      .then((data) => {
        dispatch({
          type: IngredientsActionTypes.GET_ITEMS_SUCCESS,
          items: data.data,
          bunName: bunName,
        });
      })
      .catch((err) => {
        dispatch({
          type: IngredientsActionTypes.GET_ITEMS_FAILED,
        });
      });
  };
};
