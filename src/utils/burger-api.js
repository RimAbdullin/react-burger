import { NORMA_API } from '../data/data';

/**
 * Получить массив объектов (список ингредиентов бургера).
 * @returns Promise<data>
 */
export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
}

/**
 * Проверка response.
 * @param {*} res - response.
 * @returns json || err
 */
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
