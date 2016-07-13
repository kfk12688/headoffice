import { CALL_API } from "../middleware/callAPI";
import * as t from "./types";
import { getTemplateForEdit, modifyTemplate } from "./api";

// Async Actions
function fetchTemplate(params) {
  return {
    [CALL_API] : {
      types    : [t.EDITOR_REQUEST, t.EDITOR_SUCCESS, t.EDITOR_FAILURE],
      callback : getTemplateForEdit(params),
    },
  };
}

export function loadEditor(params) {
  return (dispatch) =>
    dispatch(fetchTemplate(params));
}

function pushTemplate(params) {
  return {
    [CALL_API] : {
      types    : [t.TEMPLATE_EDIT_REQUEST, t.TEMPLATE_EDIT_SUCCESS, t.TEMPLATE_EDIT_FAILURE],
      callback : modifyTemplate(params),
    },
  };
}

export function editTemplate(params) {
  return (dispatch) =>
    dispatch(pushTemplate(params))
      .then(dispatch(fetchTemplate(params)));
}
