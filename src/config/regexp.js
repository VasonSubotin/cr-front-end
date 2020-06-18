/**
 * Regular expressions patterns to use.
 */
export const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[!-\/:-@[-`{-~a-zA-Z\d]{8,}$/; // eslint-disable-line no-useless-escape
export const EMAIL = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
