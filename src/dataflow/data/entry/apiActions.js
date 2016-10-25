/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../../middleware/callAPI";
import { SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, ADD_ROW_REQUEST, ADD_ROW_SUCCESS, ADD_ROW_FAILURE } from "./types";
import * as api from "../../api";

export const getSpec = params => ({
  [CALL_API] : {
    types    : [SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE],
    callback : api.getSpec(params),
  },
});
export const createRow = params => ({
  [CALL_API] : {
    types    : [ADD_ROW_REQUEST, ADD_ROW_SUCCESS, ADD_ROW_FAILURE],
    callback : api.addRow(params),
  },
});
