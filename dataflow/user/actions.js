import { createAction } from "redux-actions";
import { CALL_API } from "../middleware/callAPI";
import * as type from "./types";
import { getUserList } from "./api";

// Async Actions
function loadUser(params) {
  return {
    [CALL_API] : {
      types    : [type.USER_REQUEST, type.USER_SUCCESS, type.USER_FAILURE],
      callback : getUserList(params),
    },
  };
}

export { loadUser };

// Sync Actions
const toggleUser = createAction(type.TOGGLE_USER, key => ({ key }));
const selectAllUser = createAction(type.SELECT_ALL_USER);
const clearUserSelection = createAction(type.CLEAR_USER_SELECTION);

export { toggleUser, selectAllUser, clearUserSelection };
