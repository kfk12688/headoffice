/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../middleware/callAPI";
import {
  WORKBOOK_REQUEST, WORKBOOK_SUCCESS, WORKBOOK_FAILURE, NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS,
  NEW_WORKBOOK_FAILURE
} from "./types";
import * as api from "../api";

export const getWorkbooks = () => ({
  [CALL_API] : {
    types    : [WORKBOOK_REQUEST, WORKBOOK_SUCCESS, WORKBOOK_FAILURE],
    callback : api.getWorkbooksList(),
  },
});
export const createWorkbook = (params) => ({
  [CALL_API] : {
    types    : [NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS, NEW_WORKBOOK_FAILURE],
    callback : api.addNewWorkbook(params),
  },
});
export const removeWorkbook = (params) => ({
  [CALL_API] : {
    types    : [NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS, NEW_WORKBOOK_FAILURE],
    callback : api.deleteWorkbook(params),
  },
});
