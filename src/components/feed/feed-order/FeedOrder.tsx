import styles from './FeedOrder.module.css';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import { getWSSelector } from '../../../services/selectors/selector';
import { ListFeedOrders } from './list-feed-order/ListFeedOrders';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { WSActionTypes } from '../../../services/store/types/ws';
import { socketMiddleware } from '../../../services/middleware/socketMiddleware';
import { NORMA_API_WS } from '../../../data/data';

// const socket = new WebSocket(NORMA_API_WS);

// socket.onopen = () => {
//   console.log('connection open');
//   console.log('=== socket', socket);
// };

// socket.onmessage = (event) => {
//   const { data } = event;
//   console.log('=== data', data);

//   // console.log('=== event', event);
//   // const { data } = event;
//   // dispatch({ type: WSActionTypes.WS_GET_MESSAGE, payload: data });
// };

function FeedOrder() {
  const dispatch = useAppDispatch();

  // const ws = socketMiddleware(NORMA_API_WS);

  // Получаем данные из хранилища redux.
  const { error, messages, wsConnected } = useTypedSelector(getWSSelector);

  useEffect(() => {
    dispatch({
      type: WSActionTypes.WS_CONNECTION_START,
      payload: undefined,
    });
    // return () => {};
  }, []);

  // useEffect(() => {
  //   if (wsConnected) {
  //     console.log('=== messages', messages);
  //     // dispatch({
  //     //   type: WSActionTypes.WS_GET_MESSAGE,
  //     //   payload: undefined,
  //     // });
  //   }
  // }, [messages]);

  return !wsConnected ? (
    <section className={styles['Info-container']}>
      <p>Идет загрузка ...</p>
    </section>
  ) : error ? (
    <section className={styles['Info-container']}>
      <h1>Данные не найдены.</h1>
    </section>
  ) : (
    <section className={`${styles.Container}`}>
      <div
        className={`mt-10 mb-5 text text_type_main-large text_color_primary ${styles.Title}`}
      >
        Соберите бургер
      </div>
      <div className={`custom-scroll ${styles['Scroll-area']}`}>
        <div>
          <div
            className={`mt-10 text text_type_main-medium text_color_primary`}
          >
            <a id={'id-bun'}>Булки</a>
          </div>
          {/* <ListFeedOrders data={messages}></ListFeedOrders> */}
        </div>
      </div>
    </section>
  );
}

export default FeedOrder;
