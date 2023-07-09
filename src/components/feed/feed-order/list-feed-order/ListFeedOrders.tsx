import { IFeedOrders } from '../../../../services/common/interfaces';
import CardFeedOrder from '../feed-order-ingredients/CardFeedOrder';
import styles from './ListFeedOrders.module.css';

interface IListFeedOrdersProps {
  data: IFeedOrders;
}

export const ListFeedOrders: React.FC = ({}) => {
  // export const ListFeedOrders: React.FC<IListFeedOrdersProps> = ({ data }) => {
  return (
    <section>
      <div className={styles['List-container']}>
        {/* {data.orders.map((item) => (
          <CardFeedOrder key={item._id}>{item}</CardFeedOrder>
        ))} */}
      </div>
    </section>
  );
};
