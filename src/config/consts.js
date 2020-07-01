/**
 * Application settings.
 */
export const IS_DEV = process.env.IS_DEV;

/**
 * Server settings.
 */
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

/**
 * User settings.
 */
export const DEFAULT_EMAIL = process.env.NEXT_PUBLIC_DEFAULT_EMAIL;
export const DEFAULT_PASSWORD = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD;

/**
 * Access keys/IDs.
 */
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/**
 * Session/auth settings.
 */
export const COOKIE_OPTIONS = {
  expires: 1,
};
export const ONE_DAY = 24 * 60 * 60 * 1000; // 1 day
export const SESSION_EXPIRE_ACTIVE_PAGE = 60 * 60 * 1000; // 60 minutes
export const SESSION_EXPIRE_CLOSED_PAGE = 30 * 60 * 1000; // 30 minutes
export const SESSION_CONTINUE_EVENTS = [
  "fullscreenchange",
  "resize",
  "scroll",
  "click",
  "touchmove",
  "touchstart",
  "keydown",
  "keyup",
  "mousemove",
  "focus",
];
