export const getIngredientsSelector = (store) => store.ingredients;

export const getIngredientsConstructorSelector = (store) =>
  store.ingredientConstructor;

export const getOrderSelector = (store) => store.order;

export const getModalSelector = (store) => store.modal;

export const getRegistrationSelector = (store) => store.registration;

export const getLoginSelector = (store) => store.login;

export const getRefreshTokenSelector = (store) => store.refresh;

export const getLogoutSelector = (store) => store.logout;

export const userSelector = (store) => store.user;

export const getForgotPasswordSelector = (store) => store.forgotPassword;

export const getPasswordResetSelector = (store) => store.passwordReset;

export const getAuthSelector = (store) => store.auth;
