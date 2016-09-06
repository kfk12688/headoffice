import { CALL_API } from "../../middleware/callAPI";
import { SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE } from "./types";
import * as api from "../api";

/**
 * Get the available data for the requested template
 */
const _getData = params => ({
  [CALL_API] : {
    types    : [DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE],
    callback : api.getData(params),
  },
});
export const loadData = params => dispatch =>
  dispatch(_getData(params));

/**
 * Get the template specification
 */
const _getSpec = params => ({
  [CALL_API] : {
    types    : [SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE],
    callback : api.getSpec(params),
  },
});
export const loadSpec = params => (dispatch) =>
  dispatch(_getSpec(params))
    .then(dispatch(loadData(params)));
