const Modal = ({ children }) => {
  return PortalReactDOM.createPortal(
    <>
      <ModalOverlay>
        <section className={`${styles.Modal}`}>
          {/* Заголовок. */}
          <section className={`${styles['Title']}`}>Детали ингредиента</section>
          {/* Прочая разметка... */}
        </section>
        {/* Содержимое компонента IngredientDetails */}
        {children}
      </ModalOverlay>
    </>,
    modalRoot
  );
};

export default Modal;
