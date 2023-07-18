import { IFeedOrderData } from '../../../services/common/interfaces';
import CardProfileOrder from '../card-profile-order/CardProfileOrder';
import styles from './ListProfileOrders.module.css';

interface IListProfileOrdersProps {
  data: IFeedOrderData[];
}

export const ListProfileOrders: React.FC<IListProfileOrdersProps> = ({
  data,
}) => {
  return (
    <section>
      <div className={styles['List-container']}>
        {data.map((item) => (
          <CardProfileOrder key={item._id}>{item}</CardProfileOrder>
        ))}
      </div>
    </section>
  );
};
