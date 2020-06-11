import { all, fork } from "redux-saga/effects";

import { accountSaga } from "modules/account";
import { authSaga } from "modules/auth";

export function* rootSaga() {
  yield all([fork(authSaga), fork(accountSaga)]);
}
