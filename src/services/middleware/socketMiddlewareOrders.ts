import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../store/store';
import { WSOrderAction, WSOrderActionTypes } from '../store/types/wsOrder';
import { IFeedOrders } from '../common/interfaces';
import { getCookie } from '../common/common';

export const socketMiddlewareOrders = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: WSOrderAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === WSOrderActionTypes.WS_ORDER_CONNECTION_START) {
        // объект класса WebSocket
        const accessToken = getCookie('accessToken');
        let token = '';
        if (accessToken) {
          token = accessToken.split(' ')[1];
        }

        socket = new WebSocket(wsUrl + '?token=' + token);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = () => {
          dispatch({
            type: WSOrderActionTypes.WS_ORDER_CONNECTION_SUCCESS,
            payload: undefined,
          });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event: Event) => {
          dispatch({
            type: WSOrderActionTypes.WS_ORDER_CONNECTION_ERROR,
            payload: event,
          });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parseData: IFeedOrders = JSON.parse(data);

          dispatch({
            type: WSOrderActionTypes.WS_ORDER_GET_MESSAGE,
            payload: parseData,
          });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event: CloseEvent) => {
          dispatch({
            type: WSOrderActionTypes.WS_ORDER_CONNECTION_CLOSED,
            payload: event,
          });
        };

        if (type === WSOrderActionTypes.WS_ORDER_SEND_MESSAGE) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
