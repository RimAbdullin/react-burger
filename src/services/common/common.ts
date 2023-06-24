export const setCookie = (
  cookieKey: string,
  cookieValue: string,
  expirationDays: number = 0
) => {
  let expiryDate = '';

  // if (expirationDays) {
  //   const date = new Date();

  //   date.setTime(
  //     `${date.getTime()}${expirationDays || 30 * 24 * 60 * 60 * 1000}`
  //   );

  //   expiryDate = `; expiryDate=" ${date.toUTCString()}`;
  // }

  document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;
};

export const getCookie = (cookieKey: string) => {
  let cookieName = `${cookieKey}=`;

  let cookieArray = document.cookie.split(';');

  for (let cookie of cookieArray) {
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }

    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
};

export const saveTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeCookie = (
  sKey: string,
  sPath: string = '',
  sDomain: string = ''
) => {
  document.cookie =
    encodeURIComponent(sKey) +
    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
    (sDomain ? '; domain=' + sDomain : '') +
    (sPath ? '; path=' + sPath : '');
};
