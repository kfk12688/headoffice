/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../middleware/callAPI";
import {
  NEW_USER_REQUEST, NEW_USER_SUCCESS, NEW_USER_FAILURE, GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS,
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE
} from "./types";
import * as api from "./api";

export const getUsers = () => ({
  [CALL_API] : {
    types    : [GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE],
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
