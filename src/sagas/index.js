import { all, fork } from "redux-saga/effects";

import { serverAPI } from "api";
import { authSaga } from "modules/auth";

export function* rootSaga() {
  yield all([fork(authSaga, serverAPI)]);
}
