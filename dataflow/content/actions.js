import { createAction } from "redux-actions";
import { CALL_API } from "../middleware/callAPI";
import * as type from "./types";
import { getContentList, createTemplate } from "./api";

// Async Actions
export function loadTemplate(params) {
  return {
    [CALL_API] : {
      types    : [type.CONTENT_REQUEST, type.CONTENT_SUCCESS, type.CONTENT_FAILURE],
      callback : getContentList(params),
    },
  };
}

export function addTemplate(params) {
  return {
    [CALL_API] : {
      types : [type.TEMPLATE_CREATE_REQUEST, type.TEMPLATE_CREATE_SUCCESS, type.TEMPLATE_CREATE_FAILURE ],
      callback : createTemplate(params),
    },
  };
}

// Sync Actions
const toggleContent = createAction(type.TOGGLE_CONTENT, key => ({ key }));
const selectAllContent = createAction(type.SELECT_ALL_CONTENT);
const clearContentSelection = createAction(type.CLEAR_CONTENT_SELECTION);

export { toggleContent, selectAllContent, clearContentSelection };
