import { createReducer, createActions } from "reduxsauce";
import immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signInRequest: ["email", "password"],
  signInSuccess: [],
  signInFailure: ["error"],

  signUpRequest: ["email", "password"],
  signUpSuccess: [],
  signUpFailure: ["error"],

  smartCarSignInRequest: null,

  signOutRequest: null,
});

export { Types as authTypes, Creators as authActions };

/* ------------- Initial State ------------- */

export const authInitialState = immutable({
  isSignedIn: false,

  signInError: null,
});

/* ------------- Selectors ------------- */

export const authSelectors = {
  getIsSignedIn: (state) => state.auth.isSignedIn,

  getSignInError: (state) => state.auth.signInError,
};

/* ------------- Reducers ------------- */

const signInRequest = (state) => ({ ...state, signInError: null });
const signInSuccess = (state) => ({ ...state, isSignedIn: true, signInError: null });
const signInFailure = (state, { error }) => ({ ...state, signInError: error });

const smartCarLoginRequest = (state) => ({ ...state });

/* ------------- Hookup Reducers To Types ------------- */

export const authReducer = createReducer(authInitialState, {
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,

  // Sign up has identical flow to sign in as per reducer usage.
  [Types.SIGN_UP_REQUEST]: signInRequest,
  [Types.SIGN_UP_SUCCESS]: signInSuccess,
  [Types.SIGN_UP_FAILURE]: signInFailure,

  [Types.SMART_CAR_SIGN_IN_REQUEST]: smartCarLoginRequest,
});
