export const SET_BUN = 'SET_BUN';

// thunk
// Устанавливаем выбранную булку.
export function setBun(bunName, bun) {
  return function (dispatch) {
    dispatch({
      type: SET_BUN,
      bunName: bunName,
      bun: bun,
    });
  };
}
