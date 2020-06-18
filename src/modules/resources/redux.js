import { createReducer, createActions } from "reduxsauce";
import immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setResources: ["resources"],

  deleteResource: ["resourceId"],

  setSelectedResource: ["resourceId"],
  clearSelectedResource: null,

  showSchedule: null,
  hideSchedule: null,
});

export { Types as resourcesTypes, Creators as resourcesActions };

/* ------------- Initial State ------------- */

export const resourcesInitialState = immutable({
  resources: [],

  selectedResourceId: null,

  isShowSchedule: false,
});

/* ------------- Selectors ------------- */

export const resourcesSelectors = {
  getResources: (state) => state.resources.resources,

  getSelectedResourceId: (state) => state.resources.selectedResourceId,
  getSelectedResource: (state) =>
    state.resources.resources.find(
      (resource) => resource.resourceId === state.resources.selectedResourceId,
    ),

  getIsShowSchedule: (state) => state.resources.isShowSchedule,
};

/* ------------- Reducers ------------- */

const setResources = (state, { resources }) => ({ ...state, resources });

const deleteResource = (state, { resourceId }) => ({
  ...state,
  resources: state.resources.filter((resource) => resource.resourceId !== resourceId),
  selectedResourceId: state.selectedResourceId === resourceId ? null : state.selectedResourceId,
});

const setSelectedResource = (state, { resourceId }) => ({
  ...state,
  selectedResourceId: resourceId,
});
const clearSelectedResource = (state) => ({ ...state, selectedResourceId: null });

const showSchedule = (state) => ({ ...state, isShowSchedule: true });
const hideSchedule = (state) => ({ ...state, isShowSchedule: false });

/* ------------- Hookup Reducers To Types ------------- */

export const resourcesReducer = createReducer(resourcesInitialState, {
  [Types.SET_RESOURCES]: setResources,

  [Types.DELETE_RESOURCE]: deleteResource,

  [Types.SET_SELECTED_RESOURCE]: setSelectedResource,
  [Types.CLEAR_SELECTED_RESOURCE]: clearSelectedResource,

  [Types.SHOW_SCHEDULE]: showSchedule,
  [Types.HIDE_SCHEDULE]: hideSchedule,
});
