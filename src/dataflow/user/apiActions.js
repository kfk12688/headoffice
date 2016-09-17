/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../middleware/callAPI";
import {
  NEW_USER_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAILURE, USER_FAILURE, USER_REQUEST, USER_SUCCESS
} from "./types";
import * as api from "./api";

export const getUsers = () => ({
  [CALL_API] : {
    types    : [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
    callback : api.getUserList(),
  },
});

export const createUser = params => ({
  [CALL_API] : {
    types    : [NEW_USER_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAILURE],
    callback : api.addNewUser(params),
  },
});

export const removeUser = params => ({
  [CALL_API] : {
    types    : [NEW_USER_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAILURE],
    callback : api.deleteUser(params),
  },
});
