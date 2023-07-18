export const FEED_CONNECTION_INIT: 'FEED_CONNECTION_INIT' =
  'FEED_CONNECTION_INIT';
export const FEED_CONNECTION_SUCCESS: 'FEED_CONNECTION_SUCCESS' =
  'FEED_CONNECTION_SUCCESS';
export const FEED_CONNECTION_CLOSE: 'FEED_CONNECTION_CLOSE' =
  'FEED_CONNECTION_CLOSE';
export const FEED_CONNECTION_CLOSED: 'FEED_CONNECTION_CLOSED' =
  'FEED_CONNECTION_CLOSED';
export const FEED_CONNECTION_ERROR: 'FEED_CONNECTION_ERROR' =
  'FEED_CONNECTION_ERROR';
export const FEED_GET_MESSAGE: 'FEED_GET_MESSAGE' = 'FEED_GET_MESSAGE';

export const feedWsActions = {
  wsInit: FEED_CONNECTION_INIT,
  wsClose: FEED_CONNECTION_CLOSE,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSED,
  onMessage: FEED_GET_MESSAGE,
  onError: FEED_CONNECTION_ERROR,
};
