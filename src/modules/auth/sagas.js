import Router from "next/router";
import { put, all, call, takeLatest } from "redux-saga/effects";

import { routes, consts } from "config";
// import { getRandomInt } from "utils/getRandomInt";
import { accountActions } from "modules/account";
// import { resourcesActions } from "modules/resources";

import { authTypes, authActions } from "./redux";
import * as authServices from "./services";

const TAG = "[AuthSagas]";

function* signInSumUp(serverAPI, { tokenType, accessToken, email }) {
  yield call(serverAPI.setAccessToken, accessToken);

  yield put(accountActions.setUserEmail(email));
  yield put(authActions.signInSuccess(tokenType, accessToken));

  Router.push(routes.MAIN.href);
}

function* signInByCookies(serverAPI, { authCookies }) {
  // Update cookies expiration time
  authServices.setAuthCookiesExpiration(consts.ONE_DAY);

  yield call(signInSumUp, serverAPI, authCookies);
}

function* signInByCredentials(serverAPI, { email, password }) {
  let { response } = yield call(serverAPI.authenticate, { login: email, password });

  if (response.status !== 200) {
    const message = `${TAG} ${response.data.status} ${response.data.error} ${response.data.message}`;
    yield put(authActions.signInFailure(message));
    console.error(message);
    return;
  }

  const { token: accessToken } = response.data;

  const authData = {
    accessToken,
    email,
    tokenType: "Bearer",
  };

  authServices.setAuthCookies(authData);

  yield call(signInSumUp, serverAPI, authData);
}

function* signUp(serverAPI, { email, password }) {
  const { response } = yield call(serverAPI.signUp, { login: email, password });
  console.log(response);

  if (response.status !== 200) {
    const message = `${TAG} ${response.data.status} ${response.data.error} ${response.data.message}`;
    yield put(authActions.signUpFailure(message));
    console.error(message);
    return;
  }

  yield put(authActions.signUpSuccess());

  yield call(signInByCredentials, serverAPI, { email, password });
}

function* signOut(serverAPI) {
  yield call(serverAPI.clearAccessToken);

  // Clear auth cookies
  authServices.clearAuthCookies();

  // Use local storage event listener to logout from all pages
  window.localStorage.setItem("logout", Date.now());

  Router.push(routes.SIGN_IN.href);
}

function* smartCarSignIn(serverAPI) {
  const { response } = yield call(serverAPI.smartCarSignIn);

  if (response.status !== 200) {
    const message = `${TAG} ${response.data.status} ${response.data.error} ${response.data.message}`;
    yield put(authActions.signInSuccess(message));
    console.error(message);
    return;
  }
}

export function* authSaga(serverAPI) {
  yield all([
    takeLatest(authTypes.SIGN_IN_BY_CREDENTIALS_REQUEST, signInByCredentials, serverAPI),
    takeLatest(authTypes.SIGN_IN_BY_COOKIES_REQUEST, signInByCookies, serverAPI),
    takeLatest(authTypes.SIGN_UP_REQUEST, signUp, serverAPI),
    takeLatest(authTypes.SMART_CAR_SIGN_IN_REQUEST, smartCarSignIn, serverAPI),
    takeLatest(authTypes.SIGN_OUT_REQUEST, signOut, serverAPI),
  ]);
}
