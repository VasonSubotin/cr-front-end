import { createReducer, createActions } from "reduxsauce";
import immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setResources: ["resources"],

  setSelectedResource: ["resourceId"],
  clearSelectedResource: null,

  showSchedule: null,
  hideSchedule: null,
});

export { Types as resourcesTypes, Creators as resourcesActions };

/* ------------- Initial State ------------- */

export const resourcesInitialState = immutable({
  resources: [],

  selectedResource: null,

  isShowSchedule: false,
});

/* ------------- Selectors ------------- */

export const resourcesSelectors = {
  getResources: (state) => state.resources.resources,

  getSelectedResource: (state) => state.resources.selectedResource,

  getIsShowSchedule: (state) => state.resources.isShowSchedule,
};

/* ------------- Reducers ------------- */

const setResources = (state, { resources }) => ({ ...state, resources });

const setSelectedResource = (state, { resourceId }) => ({ ...state, selectedResource: resourceId });
const clearSelectedResource = (state) => ({ ...state, selectedResource: null });

const showSchedule = (state) => ({ ...state, isShowSchedule: true });
const hideSchedule = (state) => ({ ...state, isShowSchedule: false });

/* ------------- Hookup Reducers To Types ------------- */

export const resourcesReducer = createReducer(resourcesInitialState, {
  [Types.SET_RESOURCES]: setResources,

  [Types.SET_SELECTED_RESOURCE]: setSelectedResource,
  [Types.CLEAR_SELECTED_RESOURCE]: clearSelectedResource,

  [Types.SHOW_SCHEDULE]: showSchedule,
  [Types.HIDE_SCHEDULE]: hideSchedule,
});
