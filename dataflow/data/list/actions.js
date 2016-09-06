import { CALL_API } from "../../middleware/callAPI";
import { GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE } from "./types";
import * as templateApi from "../../template/api";
import { clearFilterState } from "../../filter/actions";
import { clearMenuState } from "../../menu/actions";

/**
 * Load all the existing templates in the DB
 */
function _loadTemplate() {
  return {
    [CALL_API] : {
      types    : [GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE],
      callback : templateApi.getTemplates(),
    },
  };
}
export function loadTemplate() {
  return (dispatch) => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    dispatch(_loadTemplate());
  };
}
