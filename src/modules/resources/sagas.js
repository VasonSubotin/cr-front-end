import { call, put } from "redux-saga/effects";

import { resourcesActions } from "./redux";

const TAG = "[ReousrcesSagas]";

export function* getResources(serverAPI) {
  const { response } = yield call(serverAPI.getResources);

  if (!response.ok) {
    console.error(TAG, "Unable to get resources", response.data.status, response.data.message);
    return;
  }

  yield put(resourcesActions.setResources(response.data));
}
