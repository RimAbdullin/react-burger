import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../store/store';
import { WSAction, WSActionType } from '../store/types/ws';
import { IFeedOrders } from '../common/interfaces';

export const socketMiddleware = (wsAction: WSActionType): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: WSAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === wsAction.wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(payload);
      }

      if (type === wsAction.wsClose) {
        // объект класса WebSocket
        if (socket) {
          socket.close();
        }
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          dispatch({
            type: wsAction.onOpen,
            payload: undefined,
          });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event: Event) => {
          dispatch({ type: wsAction.onError, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parseData: IFeedOrders = JSON.parse(data);

          dispatch({ type: wsAction.onMessage, payload: parseData });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event: CloseEvent) => {};
      }

      next(action);
    };
  }) as Middleware;
};
