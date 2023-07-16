import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../store/store';
import { WSAction, WSActionTypes } from '../store/types/ws';
import { IFeedOrders } from '../common/interfaces';

// export const socketMiddleware = (wsUrl: string): Middleware => {
export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: WSAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WSActionTypes.WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(payload);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          dispatch({
            type: WSActionTypes.WS_CONNECTION_SUCCESS,
            payload: undefined,
          });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event: Event) => {
          dispatch({ type: WSActionTypes.WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parseData: IFeedOrders = JSON.parse(data);

          dispatch({ type: WSActionTypes.WS_GET_MESSAGE, payload: parseData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event: CloseEvent) => {
          console.log('ws close');

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
