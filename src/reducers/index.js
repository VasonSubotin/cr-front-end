import { combineReducers } from "redux";
import { resettableReducer } from "reduxsauce";

import { authReducer, authTypes } from "modules/auth";

const resettable = resettableReducer(authTypes.SIGN_OUT_REQUEST);

export const rootReducer = combineReducers({
  auth: resettable(authReducer),
});
