import PropTypes from "prop-types";

export const AUTH_COOKIES = PropTypes.shape({
  tokenType: PropTypes.string,
  accessToken: PropTypes.string,
  email: PropTypes.string,
});
