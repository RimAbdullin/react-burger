import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../store/store';
import { WSAction, WSActionTypes } from '../store/types/ws';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: WSAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      console.log('=== type', type);
      console.log('=== payload', payload);

      if (type === WSActionTypes.WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({
            type: WSActionTypes.WS_CONNECTION_SUCCESS,
            payload: event,
          });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: WSActionTypes.WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: WSActionTypes.WS_GET_MESSAGE, payload: data });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({
            type: WSActionTypes.WS_CONNECTION_CLOSED,
            payload: event,
          });
        };

        if (type === WSActionTypes.WS_SEND_MESSAGE) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
