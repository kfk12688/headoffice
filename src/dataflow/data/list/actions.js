import { clearFilterState } from "../../filter/actions";
import { clearMenuState } from "../../menu/actions";
import { createAction } from "redux-actions";
import { GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE } from "./types";
import * as api from "../../api";

const templatesRequest = createAction(GET_TEMPLATES_REQUEST);
const templatesSuccess = createAction(GET_TEMPLATES_SUCCESS, data => ({ data }));
const templatesFailure = createAction(GET_TEMPLATES_FAILURE, err => ({ err }));

export function getTemplates() {
  return dispatch => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    dispatch(templatesRequest());

    return api
      .getTemplates()
      .then(templates => dispatch(templatesSuccess(templates)))
      .catch(err => dispatch(templatesFailure(err)));
  };
}
