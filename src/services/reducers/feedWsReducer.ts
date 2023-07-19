import { IFeedOrders } from '../common/interfaces';
import {
  FEED_CONNECTION_CLOSED,
  FEED_CONNECTION_ERROR,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
} from '../store/types/feedWsActions';
import { type WSAction } from '../store/types/ws';

export type TFeedWsState = {
  wsConnected: boolean;
  messages: IFeedOrders;
  error?: null | Event;
};

const initialState: TFeedWsState = {
  wsConnected: false,
  messages: {} as IFeedOrders,
  error: null,
};

// Создадим редьюсер для WebSocket
export const feedWsReducer = (state = initialState, action: WSAction) => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case FEED_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: { ...action.payload },
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case FEED_CONNECTION_CLOSED:
      return { ...state, error: undefined, wsConnected: false };

    default:
      return state;
  }
};
