/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../../middleware/callAPI";
import { SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE } from "./types";
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
