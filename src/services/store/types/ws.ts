import { IFeedOrders } from '../../common/interfaces';
import { feedWsActions } from './feedWsActions';
import { orderWsActions } from './orderWsActions';

interface IConnectionErrorWS {
  readonly type: typeof feedWsActions.onError | typeof orderWsActions.onError;
  payload: any;
}

interface IConnectionSuccessWS {
  readonly type: typeof feedWsActions.onOpen | typeof orderWsActions.onOpen;
  payload: any;
}

interface IGetMessageWS {
  readonly type:
    | typeof feedWsActions.onMessage
    | typeof orderWsActions.onMessage;
  payload: IFeedOrders;
}

interface IConnectionClosed {
  readonly type: typeof feedWsActions.onClose | typeof orderWsActions.onClose;
  payload: any;
}

interface IConnectionCloseWS {
  readonly type: typeof feedWsActions.wsClose | typeof orderWsActions.wsClose;
  payload: any;
}

interface IConnectionInitWS {
  readonly type: typeof feedWsActions.wsInit | typeof orderWsActions.wsInit;
  payload: string;
}

export type WSAction =
  | IConnectionErrorWS
  | IConnectionSuccessWS
  | IGetMessageWS
  | IConnectionInitWS
  | IConnectionClosed
  | IConnectionCloseWS;

export type WSActionType = typeof feedWsActions | typeof orderWsActions;

const test: WSActionType = {
  onClose: 'FEED_CONNECTION_CLOSED',
  onError: 'FEED_CONNECTION_ERROR',
  onMessage: 'FEED_GET_MESSAGE',
  onOpen: 'FEED_CONNECTION_SUCCESS',
  wsClose: 'FEED_CONNECTION_CLOSE',
  wsInit: 'FEED_CONNECTION_INIT',
};
