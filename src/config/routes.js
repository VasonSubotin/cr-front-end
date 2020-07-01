import { SERVER_URL } from "./consts";

/**
 * Possible link types (internal/external).
 */
export const LinkTypes = {
  EXTERNAL: "EXTERNAL",
  INTERNAL: "INTERNAL",
};

/**
 * Application routes.
 */
export const SIGN_IN = {
  text: "Sign in",
  href: "/",
  type: LinkTypes.INTERNAL,
};

export const SIGN_UP = {
  text: "Sign up",
  href: "/sign-up",
  type: LinkTypes.INTERNAL,
};

export const MAIN = {
  text: "Main",
  href: "/main",
  type: LinkTypes.INTERNAL,
};

export const DEMO = {
  text: "Demo",
  href: "/demo",
  type: LinkTypes.INTERNAL,
};

export const SESSION = {
  text: "Session",
  href: "/session",
  type: LinkTypes.INTERNAL,
};

export const SETTINGS = {
  text: "Settings",
  href: "/settings",
  type: LinkTypes.INTERNAL,
};

/**
 * Server redirection links.
 */
export const GOOGLE_SIGN_IN = {
  text: "Sign in with Google",
  href: `${SERVER_URL}/googleLogin`,
  type: LinkTypes.INTERNAL,
};

export const SMART_CAR_SIGN_IN = {
  text: "Add a car",
  href: `${SERVER_URL}/smartCarLogin`,
  type: LinkTypes.INTERNAL,
};
