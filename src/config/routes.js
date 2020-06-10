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
