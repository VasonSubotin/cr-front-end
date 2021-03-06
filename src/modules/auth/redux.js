import { createReducer, createActions } from "reduxsauce";
import immutable from "seamless-immutable";
import { HYDRATE } from "next-redux-wrapper";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signInByCredentialsRequest: ["email", "password"],
  signInByCookiesRequest: ["authCookies"],
  signInSuccess: ["tokenType", "accessToken"],
  signInFailure: ["error"],

  signUpRequest: ["email", "password"],
  signUpSuccess: null,
  signUpFailure: ["error"],

  setSmartCarToken: ["smartCarToken"],

  signOutRequest: null,
});

export { Types as authTypes, Creators as authActions };

/* ------------- Initial State ------------- */

export const authInitialState = immutable({
  isSignedIn: false,

  tokenType: null,
  accessToken: null,
  smartCarToken: null,

  signInError: null,
});

/* ------------- Selectors ------------- */

export const authSelectors = {
  getIsSignedIn: (state) => state.auth.isSignedIn,

  getTokenType: (state) => state.auth.tokenType,
  getAccessToken: (state) => state.auth.accessToken,
  getSmartCarToken: (state) => state.auth.smartCarToken,

  getSignInError: (state) => state.auth.signInError,
};

/* ------------- Reducers ------------- */

const hydrate = (state, { payload }) => ({ ...state, ...payload.auth });

const signInRequest = (state) => ({ ...state, isSignedIn: false, signInError: null });
const signInSuccess = (state, { accessToken, tokenType }) => ({
  ...state,
  isSignedIn: true,
  signInError: null,
  accessToken,
  tokenType,
});
const signInFailure = (state, { error }) => ({ ...state, signInError: error });

const setSmartCarToken = (state, { smartCarToken }) => ({ ...state, smartCarToken });

/* ------------- Hookup Reducers To Types ------------- */

export const authReducer = createReducer(authInitialState, {
  [HYDRATE]: hydrate,

  [Types.SIGN_IN_BY_CREDENTIALS_REQUEST]: signInRequest,
  [Types.SIGN_IN_BY_COOKIES_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,

  // Sign up has identical flow to sign in as per reducer usage.
  [Types.SIGN_UP_REQUEST]: signInRequest,
  [Types.SIGN_UP_SUCCESS]: signInSuccess,
  [Types.SIGN_UP_FAILURE]: signInFailure,

  [Types.SET_SMART_CAR_TOKEN]: setSmartCarToken,
});
