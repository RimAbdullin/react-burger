import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import { NavLink, useLocation } from 'react-router-dom';

import { useUser } from '../hooks/useUser';
import { ProfileMenu } from '../components/profile-menu/ProfileMenu';
import FeedOrder from '../components/feed/feed-order/FeedOrder';

export function ProfileOrderPage(): React.ReactElement {
  const user = useUser();

  // Получаем данные пользователя.
  useEffect(() => {
    user.getUser();
  }, []);

  return (
    <>
      <section className={styles.container}>
        <ProfileMenu />
        <div className={`ml-15 ${styles.content}`}>
          <FeedOrder />
        </div>
      </section>
    </>
  );
}
