import { createReducer, createActions } from "reduxsauce";
import immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setResources: ["resources"],

  scheduleRequest: ["resourceId"],
  scheduleSuccess: null,
  scheduleFailure: null,

  setSchedulePolicyType: ["policyType"],
});

export { Types as resourcesTypes, Creators as resourcesActions };

/* ------------- Initial State ------------- */

const scheduleInfoInitialState = {
  resourceId: null,
  policyType: null,
};

export const resourcesInitialState = immutable({
  resources: [],

  scheduleInfo: {
    ...scheduleInfoInitialState,
  },
});

/* ------------- Selectors ------------- */

export const resourcesSelectors = {
  getResources: (state) => state.resources.resources,

  getScheduleInfo: (state) => state.resources.scheduleInfo,
};

/* ------------- Reducers ------------- */

const setResources = (state, { resources }) => ({ ...state, resources });

const scheduleRequest = (state, { resourceId }) => ({
  ...state,
  scheduleInfo: { ...state.scheduleInfo, resourceId },
});
const scheduleSuccess = (state, { resourceId }) => {
  return {
    ...state,
    resources: state.resources.map((item) =>
      item.resourceId === state.scheduleInfo.resourceId ? { ...item, ...state.scheduleInfo } : item,
    ),
    scheduleInfo: { ...state.scheduleInfo, resourceId },
  };
};
const scheduleFailure = (state) => ({
  ...state,
  scheduleInfo: { ...scheduleInfoInitialState },
});

const setSchedulePolicyType = (state, { policyType }) => ({
  ...state,
  scheduleInfo: { ...state.scheduleInfo, policyType },
});

/* ------------- Hookup Reducers To Types ------------- */

export const resourcesReducer = createReducer(resourcesInitialState, {
  [Types.SET_RESOURCES]: setResources,

  [Types.SCHEDULE_REQUEST]: scheduleRequest,
  [Types.SCHEDULE_SUCCESS]: scheduleSuccess,
  [Types.SCHEDULE_FAILURE]: scheduleFailure,

  [Types.SET_SCHEDULE_POLICY_TYPE]: setSchedulePolicyType,
});
