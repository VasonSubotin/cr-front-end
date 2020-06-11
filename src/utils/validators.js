import { regexp, exceptions } from "config";

export const validateName = (name, required = true) => {
  if (required && !name) {
    return exceptions.FIELD_REQUIRED;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email) {
    return exceptions.FIELD_REQUIRED;
  } else if (!regexp.EMAIL.test(String(email).toLowerCase())) {
    return exceptions.EMAIL_INVALID;
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return exceptions.FIELD_REQUIRED;
  }
  if (password.length < 8) {
    return exceptions.PASSWORD_LENGTH;
  }
  if (!regexp.PASSWORD.test(password)) {
    return exceptions.PASSWORD_FORMAT;
  }

  return null;
};

export const validatePasswordMismatch = (password, newPassword) => {
  if (!newPassword) {
    return exceptions.FIELD_REQUIRED;
  }
  if (password !== newPassword) {
    return exceptions.PASSWORD_MISMATCH;
  }

  return null;
};
