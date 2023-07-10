import { IFeedOrders } from '../common/interfaces';
import { WSActionTypes, type WSAction } from '../store/types/ws';

type TWSState = {
  wsConnected: boolean;
  // messages: IFeedOrders[];
  messages: any;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: [
    {
      success: false,
      orders: [
        {
          ingredients: [],
          _id: '',
          status: '',
          number: 0,
          createdAt: null,
          updatedAt: null,
        },
      ],
      total: 0,
      totalToday: 0,
    },
  ],
};

// Создадим редьюсер для WebSocket
export const wsReducer = (state = initialState, action: WSAction) => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WSActionTypes.WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WSActionTypes.WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WSActionTypes.WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, action.payload],
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WSActionTypes.WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    default:
      return state;
  }
};
