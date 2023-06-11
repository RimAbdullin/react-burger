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
export function getOrder(data) {
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

/**
 * Регистрация пользователя в системе.
 * @returns Promise<data>
 */
export function registration(data) {
  return fetch(`${NORMA_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

/**
 * Авторизация пользователя в системе.
 * @returns Promise<data>
 */
export function login(data) {
  return fetch(`${NORMA_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

/**
 * Обновление токена.
 * @returns Promise<data>
 */
export function refresh(refreshToken) {
  const body = { token: refreshToken };
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
}

/**
 * Выход пользователя из системы.
 * @returns Promise<data>
 */
export function logout(refreshToken) {
  const body = { token: refreshToken };
  return fetch(`${NORMA_API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(checkResponse);
}

/**
 * Получить пользователя в системе.
 * @returns Promise<data>
 */
export function getUser(token) {
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then(checkResponse);
}

/**
 * Обновить данные пользователя в системе.
 * @returns Promise<data>
 */
export function updateUser(token, data) {
  console.log('update');
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

/**
 * Сброс пароля пользователя в системе.
 * @returns Promise<data>
 */
export function forgotPassword(data) {
  return fetch(`${NORMA_API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

/**
 * Изменение пароля пользователя в системе.
 * @returns Promise<data>
 */
export function passwordReset(data) {
  return fetch(`${NORMA_API}/password-reset/reset`, {
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
