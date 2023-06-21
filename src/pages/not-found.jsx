import styles from './not-found.module.css';

export const NotFoundPage = () => {
  return (
    <section className={styles.container}>
      <div>
        <span className={styles.text}>
          404. Ошибка, страница не существует.
        </span>
      </div>
    </section>
  );
};
