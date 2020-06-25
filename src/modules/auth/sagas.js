import Router from "next/router";
import { put, all, call, takeLatest } from "redux-saga/effects";

import { routes } from "config";
import { getRandomInt } from "utils/getRandomInt";
import { accountActions } from "modules/account";
import { resourcesActions } from "modules/resources";

import { authTypes, authActions } from "./redux";

const TAG = "[AuthSagas]";

function* signIn(serverAPI, { email, password }) {
  let { response } = yield call(serverAPI.authenticate, { login: email, password });

  if (response.status !== 200) {
    const message = `${TAG} ${response.data.status} ${response.data.error} ${response.data.message}`;
    yield put(authActions.signInFailure(message));
    console.error(message);
    return { error: message };
  }

  const { token } = response.data;

  yield call(serverAPI.setAccessToken, token);

  yield put(accountActions.setUserInfo(email));
  yield put(authActions.signInSuccess());

  // ({ response } = yield call(serverAPI.getResources));
  // console.log("Resources", response.data);

  // if (response.data) {
  //   yield put(
  //     resourcesActions.setResources(
  //       response.data.map((item) => ({
  //         ...item,
  //         name: "",
  //         isUseCalendar: !!getRandomInt(2),
  //         capacity: getRandomInt(100, 50),
  //         soc: getRandomInt(100),
  //         pluggedIn: !!getRandomInt(2),
  //         charging: !!getRandomInt(2),
  //       })),
  //     ),
  //   );
  // }

  Router.push(routes.MAIN.href);

  return {};
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

  const { error } = yield call(signIn, serverAPI, { email, password });
  if (error) {
    return;
  }

  yield put(authActions.signUpSuccess());
  Router.push(routes.MAIN.href);
}

function* signOut(serverAPI) {
  yield call(serverAPI.clearAccessToken);

  Router.push(routes.SIGN_IN.href);
}

function* smartCarSignIn(serverAPI) {
  const { response } = yield call(serverAPI.smartCarSignIn);

  console.log(response);
  if (response.status !== 200) {
    const message = `${TAG} ${response.data.status} ${response.data.error} ${response.data.message}`;
    yield put(authActions.signInSuccess(message));
    console.error(message);
    return;
  }
}

export function* authSaga(serverAPI) {
  yield all([
    takeLatest(authTypes.SIGN_IN_REQUEST, signIn, serverAPI),
    takeLatest(authTypes.SIGN_UP_REQUEST, signUp, serverAPI),
    takeLatest(authTypes.SMART_CAR_SIGN_IN_REQUEST, smartCarSignIn, serverAPI),
    takeLatest(authTypes.SIGN_OUT_REQUEST, signOut, serverAPI),
  ]);
}
