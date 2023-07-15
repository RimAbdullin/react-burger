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

export const dropHMS = (date: Date) => {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0, 0);
};

export const dayTitle = (number: number): string => {
  if (number > 10 && [11, 12, 13, 14].includes(number % 100)) return 'дней';
  const last_num = number % 10;
  if (last_num == 1) return 'день';
  if ([2, 3, 4].includes(last_num)) return 'дня';
  if ([5, 6, 7, 8, 9, 0].includes(last_num)) return 'дней';
  return '';
};

export const getDateToString = (date: string): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  dropHMS(today);
  dropHMS(yesterday);

  const dateMessageParse = Date.parse(date);

  const dateMessage = new Date(dateMessageParse);

  let dateMessageMatch = new Date(dateMessage);
  dropHMS(dateMessageMatch);

  if (dateMessageMatch.getTime() === today.getTime()) {
    return (
      'Сегодня, ' + dateMessage.getHours() + ':' + dateMessage.getMinutes()
    );
  } else if (dateMessageMatch.getTime() === yesterday.getTime()) {
    return 'Вчера, ' + dateMessage.getHours() + ':' + dateMessage.getMinutes();
  } else {
    const timeDiff = Math.abs(today.getTime() - dateMessage.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const message =
      diffDays +
      ' ' +
      dayTitle(diffDays) +
      ' назад ' +
      dateMessage.getHours() +
      ':' +
      dateMessage.getMinutes();
    return message;
  }
};
