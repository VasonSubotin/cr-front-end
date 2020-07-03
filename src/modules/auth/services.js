import nextCookie from "next-cookies";
import cookie from "js-cookie";

import { consts } from "config";

const CookieNames = {
  SMART_CAR_TOKEN: "EV_SCT",
  TOKEN_TYPE: "EV_TT",
  ACCESS_TOKEN: "EV_AT",
  EMAIL: "EV_EM",
  LAST_ACTIVE_WINDOW: "EV_LAW",
};

export const setAuthCookies = (
  { tokenType, accessToken, email },
  options = consts.COOKIE_OPTIONS,
) => {
  if (tokenType) {
    cookie.set(CookieNames.TOKEN_TYPE, tokenType, options);
  }
  if (accessToken) {
    cookie.set(CookieNames.ACCESS_TOKEN, accessToken, options);
  }
  if (email) {
    cookie.set(CookieNames.EMAIL, email, options);
  }
};

export const setLatestWindowIdCookie = (windowId, options = consts.COOKIE_OPTIONS) => {
  cookie.set(CookieNames.LAST_ACTIVE_WINDOW, windowId, options);
};

export const setSmartCarTokenCookie = (smartCarToken, options = consts.COOKIE_OPTIONS) => {
  cookie.set(CookieNames.SMART_CAR_TOKEN, smartCarToken, options);
};

export const getLatestWindowIdCookie = () => cookie.get(CookieNames.LAST_ACTIVE_WINDOW);

export const getSmartCarTokenCookie = () => cookie.get(CookieNames.SMART_CAR_TOKEN);

export const clearAuthCookies = () => {
  cookie.remove(CookieNames.TOKEN_TYPE);
  cookie.remove(CookieNames.ACCESS_TOKEN);
  cookie.remove(CookieNames.EMAIL);
};

export const setAuthCookiesExpiration = (expire) => {
  const cookieExpires = expire / consts.ONE_DAY;

  const accessToken = cookie.get(CookieNames.ACCESS_TOKEN);
  const tokenType = cookie.get(CookieNames.TOKEN_TYPE);
  const email = cookie.get(CookieNames.EMAIL);

  setAuthCookies(
    {
      tokenType,
      accessToken,
      email,
    },
    {
      expires: cookieExpires,
    },
  );
};

export const getNextJsAuthCookies = (context) => {
  const {
    [CookieNames.TOKEN_TYPE]: tokenType,
    [CookieNames.ACCESS_TOKEN]: accessToken,
    [CookieNames.EMAIL]: email,
  } = nextCookie(context);

  return {
    tokenType,
    accessToken,
    email,
  };
};

export const isAllAuthCookies = ({ tokenType, accessToken, email }) =>
  !!tokenType && !!accessToken && !!email;
