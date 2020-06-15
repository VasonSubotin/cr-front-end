import { createReducer, createActions } from "reduxsauce";
import immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setResources: ["resources"],
});

export { Types as resourcesTypes, Creators as resourcesActions };

/* ------------- Initial State ------------- */

export const resourcesInitialState = immutable({
  resources: [],
});

/* ------------- Selectors ------------- */

export const resourcesSelectors = {
  getResources: (state) => state.resources.resources,
};

/* ------------- Reducers ------------- */

const setResources = (state, { resources }) => ({ ...state, resources });

/* ------------- Hookup Reducers To Types ------------- */

export const resourcesReducer = createReducer(resourcesInitialState, {
  [Types.SET_RESOURCES]: setResources,
});
