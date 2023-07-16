import { IFeedOrderData } from '../../../../services/common/interfaces';
import CardFeedOrder from '../card-feed-order/CardFeedOrder';
import styles from './ListFeedOrders.module.css';

interface IListFeedOrdersProps {
  data: IFeedOrderData[];
  path: 'feed' | 'profile';
}

export const ListFeedOrders: React.FC<IListFeedOrdersProps> = ({
  path,
  data,
}) => {
  return (
    <section>
      <div className={styles['List-container']}>
        {data.map((item) => (
          <CardFeedOrder key={item._id} path={path}>
            {item}
          </CardFeedOrder>
        ))}
      </div>
    </section>
  );
};
