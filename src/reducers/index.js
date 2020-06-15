import { combineReducers } from "redux";
import { resettableReducer } from "reduxsauce";

import { accountReducer } from "modules/account";
import { authReducer, authTypes } from "modules/auth";
import { uiReducer } from "modules/ui";
import { resourcesReducer } from "modules/resources";

const resettable = resettableReducer(authTypes.SIGN_OUT_REQUEST);

export const rootReducer = combineReducers({
  account: resettable(accountReducer),
  auth: resettable(authReducer),
  ui: uiReducer,
  resources: resettable(resourcesReducer),
});
