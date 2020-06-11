import Router from "next/router";
import { put, all, takeLatest } from "redux-saga/effects";

import { routes } from "config";
import { accountActions } from "modules/account";

import { authTypes, authActions } from "./redux";

// const TAG = "[AuthSagas]";

function* signIn({ email }) {
  yield put(accountActions.setUserInfo(email));
  yield put(authActions.signInSuccess());

  Router.push(routes.MAIN.href);
}

function signOut() {
  Router.push(routes.SIGN_IN.href);
}

export function* authSaga() {
  yield all([
    takeLatest(authTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(authTypes.SIGN_OUT_REQUEST, signOut),
  ]);
}
