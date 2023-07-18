import { IFeedOrderData } from '../../../../services/common/interfaces';
import CardFeedOrder from '../card-feed-order/CardFeedOrder';
import styles from './ListFeedOrders.module.css';

interface IListFeedOrdersProps {
  data: IFeedOrderData[];
}

export const ListFeedOrders: React.FC<IListFeedOrdersProps> = ({ data }) => {
  return (
    <section>
      <div className={styles['List-container']}>
        {data.map((item) => (
          <CardFeedOrder key={item._id}>{item}</CardFeedOrder>
        ))}
      </div>
    </section>
  );
};
