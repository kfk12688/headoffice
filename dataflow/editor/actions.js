import { CALL_API } from "../middleware/callAPI";
import * as t from "./types";
import { getTemplateForEdit, modifyTemplate } from "./api";

// Async Actions
export function loadEditor(params) {
  return {
    [CALL_API] : {
      types    : [t.EDITOR_REQUEST, t.EDITOR_SUCCESS, t.EDITOR_FAILURE],
      callback : getTemplateForEdit(params),
    },
  };
}


export function editTemplate(params) {
  return {
    [CALL_API] : {
      types    : [t.TEMPLATE_EDIT_REQUEST, t.TEMPLATE_EDIT_SUCCESS, t.TEMPLATE_EDIT_FAILURE],
      callback : modifyTemplate(params),
    },
  };
}
