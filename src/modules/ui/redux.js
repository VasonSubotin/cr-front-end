import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { HYDRATE } from "next-redux-wrapper";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onWindowFocus: null,
  onWindowBlur: null,
});

export { Types as uiTypes, Creators as uiActions };

/* ------------- Initial State ------------- */

export const initStateUi = Immutable({
  isFocused: false,
});

/* ------------- Selectors ------------- */

export const uiSelectors = {
  getIsFocused: (state) => state.ui.isFocused,
};

/* ------------- Reducers ------------- */

const hydrate = (state, { payload }) => ({ ...state, ...payload.ui });

const onWindowFocus = (state) => ({ ...state, isFocused: true });
const onWindowBlur = (state) => ({ ...state, isFocused: false });

/* ------------- Hookup Reducers To Types ------------- */

export const uiReducer = createReducer(initStateUi, {
  [HYDRATE]: hydrate,

  [Types.ON_WINDOW_FOCUS]: onWindowFocus,
  [Types.ON_WINDOW_BLUR]: onWindowBlur,
});
