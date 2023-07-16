import { IFeedOrders } from '../../common/interfaces';

export enum WSOrderActionTypes {
  WS_ORDER_CONNECTION_ERROR = 'WS_ORDER_CONNECTION_ERROR',
  WS_ORDER_CONNECTION_SUCCESS = 'WS_ORDER_CONNECTION_SUCCESS',
  WS_ORDER_CONNECTION_START = 'WS_ORDER_CONNECTION_START',
  WS_ORDER_CONNECTION_CLOSED = 'WS_ORDER_CONNECTION_CLOSED',
  WS_ORDER_GET_MESSAGE = 'WS_ORDER_GET_MESSAGE',
  WS_ORDER_SEND_MESSAGE = 'WS_ORDER_SEND_MESSAGE',
}

interface IConnectionErrorWS {
  readonly type: typeof WSOrderActionTypes.WS_ORDER_CONNECTION_ERROR;
  payload: any;
}

interface IConnectionSuccessWS {
  readonly type: typeof WSOrderActionTypes.WS_ORDER_CONNECTION_SUCCESS;
  payload: any;
}

interface IGetMessageWS {
  readonly type: typeof WSOrderActionTypes.WS_ORDER_GET_MESSAGE;
  payload: IFeedOrders;
}

interface ISendMessageWS {
  readonly type: typeof WSOrderActionTypes.WS_ORDER_SEND_MESSAGE;
  payload: any;
}

interface IConnectionClosedWS {
  readonly type: typeof WSOrderActionTypes.WS_ORDER_CONNECTION_CLOSED;
  payload: any;
}

interface IConnectionStartWS {
  readonly type: typeof WSOrderActionTypes.WS_ORDER_CONNECTION_START;
  payload: any;
}

export type WSOrderAction =
  | IConnectionErrorWS
  | IConnectionSuccessWS
  | IGetMessageWS
  | ISendMessageWS
  | IConnectionClosedWS
  | IConnectionStartWS;
