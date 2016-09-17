/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../../middleware/callAPI";
import {
  SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE, UPDATE_ROW_REQUEST,
  UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE, ADD_ROW_REQUEST,
  ADD_ROW_SUCCESS, ADD_ROW_FAILURE
} from "./types";
import * as api from "../api";

export const getData = params => ({
  [CALL_API] : {
    types    : [DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE],
    callback : api.getData(params),
  },
});
export const getSpec = params => ({
  [CALL_API] : {
    types    : [SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE],
    callback : api.getSpec(params),
  },
});
export const editRow = params => ({
  [CALL_API] : {
    types    : [UPDATE_ROW_REQUEST, UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE],
    callback : api.updateRow(params),
  },
});
export const removeRow = params => ({
  [CALL_API] : {
    types    : [DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE],
    callback : api.deleteRow(params),
  },
});
export const createRow = params => ({
  [CALL_API] : {
    types    : [ADD_ROW_REQUEST, ADD_ROW_SUCCESS, ADD_ROW_FAILURE],
    callback : api.addRow(params),
  },
});
