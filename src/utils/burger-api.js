import { NORMA_API } from '../data/data';
import { getCookie } from '../services/common/common';

/**
 * Получить массив объектов (список ингредиентов бургера).
 * @returns Promise<data>
 */
export function getIngredientsRequest() {
  return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
}

/**
 * Получить массив объектов (список ингредиентов бургера).
 * @returns Promise<data>
 */
export function getOrderRequest(data) {
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
export function registrationRequest(data) {
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
export function loginRequest(data) {
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
export const refreshTokenRequest = () => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse);
};

/**
 * Выход пользователя из системы.
 * @returns Promise<data>
 */
export function logoutRequest() {
  const body = { token: localStorage.getItem('refreshToken') };
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
export function getUserRequest() {
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken'),
    },
  }).then(checkResponse);
}

/**
 * Обновить данные пользователя в системе.
 * @returns Promise<data>
 */
export function updateUserRequest(data) {
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

/**
 * Сброс пароля пользователя в системе.
 * @returns Promise<data>
 */
export function forgotPasswordRequest(data) {
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
export function passwordResetRequest(data) {
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
