import { put, all, call, takeLatest } from "redux-saga/effects";

import { resourcesTypes, resourcesActions } from "./redux";

const TAG = "[ResourcesSagas]";

function* scheduleRequest(serverAPI, { resourceId }) {
  set;
}

export function* authSaga(serverAPI) {
  yield all([takeLatest(resourcesTypes.SCHEDULE_REQUEST, scheduleRequest, serverAPI)]);
}
