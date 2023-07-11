export enum WSActionTypes {
  WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR',
  WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_START = 'WS_CONNECTION_START',
  WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED',
  WS_GET_MESSAGE = 'WS_GET_MESSAGE',
  WS_SEND_MESSAGE = 'WS_SEND_MESSAGE',
}

interface IConnectionErrorWS {
  readonly type: typeof WSActionTypes.WS_CONNECTION_ERROR;
  payload: any;
}

interface IConnectionSuccessWS {
  readonly type: typeof WSActionTypes.WS_CONNECTION_SUCCESS;
  payload: any;
}

interface IGetMessageWS {
  readonly type: typeof WSActionTypes.WS_GET_MESSAGE;
  payload: any;
}

interface ISendMessageWS {
  readonly type: typeof WSActionTypes.WS_SEND_MESSAGE;
  payload: any;
}

interface IConnectionClosedWS {
  readonly type: typeof WSActionTypes.WS_CONNECTION_CLOSED;
  payload: any;
}

interface IConnectionStartWS {
  readonly type: typeof WSActionTypes.WS_CONNECTION_START;
  payload: any;
}

export type WSAction =
  | IConnectionErrorWS
  | IConnectionSuccessWS
  | IGetMessageWS
  | ISendMessageWS
  | IConnectionClosedWS
  | IConnectionStartWS;

export interface IMessage {}
