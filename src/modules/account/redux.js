import { createReducer, createActions } from "reduxsauce";
import immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUserInfo: ["email"],
});

export { Types as accountTypes, Creators as accountActions };

/* ------------- Initial State ------------- */

export const accountInitialState = immutable({
  user: {
    email: null,
  },
});

/* ------------- Selectors ------------- */

export const accountSelectors = {
  getUser: (state) => state.account.user,
  getUserEmail: (state) => state.account.user.email,
};

/* ------------- Reducers ------------- */

const setUserInfo = (state, { email }) => ({ ...state, user: { ...state.user, email } });

/* ------------- Hookup Reducers To Types ------------- */

export const accountReducer = createReducer(accountInitialState, {
  [Types.SET_USER_INFO]: setUserInfo,
});