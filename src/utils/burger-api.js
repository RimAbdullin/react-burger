import { NORMA_API } from '../data/data';

/**
 * Получить массив объектов (список ингредиентов бургера).
 * @returns Promise<data>
 */
export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
}

/**
 * Получить массив объектов (список ингредиентов бургера).
 * @returns Promise<data>
 */
export function getOrder() {
  const data = {
    ingredients: ['643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa0942'],
  };
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

/**
 * Проверка response.
 * @param {*} res - response.
 * @returns Promise<json> || Promise<err>
 */
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
