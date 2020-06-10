import { createStore as createReduxStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import { consts } from "config";
import { rootReducer } from "reducers";
import { rootSaga } from "sagas";

const createStore = () => {
  const logger = createLogger({
    collapsed: true,
    level: "info",
  });

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [...(consts.IS_DEV ? [logger] : []), sagaMiddleware];

  const enhancer = applyMiddleware(...middleware);

  const store = createReduxStore(rootReducer, enhancer);

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const storeWrapper = createWrapper(createStore, { debug: true });
