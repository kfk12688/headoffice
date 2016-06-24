import { CALL_API } from "../../middleware/api";

export const TEMPLATE_REQUEST = "TEMPLATE_REQUEST";
export const TEMPLATE_SUCCESS = "TEMPLATE_SUCCESS";
export const TEMPLATE_FAILURE = "TEMPLATE_FAILURE";

function fetchTemplate(params) {
  return {
    [CALL_API] : {
      types    : [TEMPLATE_REQUEST, TEMPLATE_SUCCESS, TEMPLATE_FAILURE],
      endpoint : "template",
      params,
    },
  };
}

export function loadTemplate(params) {
  return dispatch => dispatch(fetchTemplate(params));
}

export const CONTENT_REQUEST = "CONTENT_REQUEST";
export const CONTENT_SUCCESS = "CONTENT_SUCCESS";
export const CONTENT_FAILURE = "CONTENT_FAILURE";

function fetchContent(params) {
  return {
    [CALL_API] : {
      types    : [CONTENT_REQUEST, CONTENT_SUCCESS, CONTENT_FAILURE],
      endpoint : "list",
      params,
    },
  };
}

export function loadContent(params) {
  return dispatch => dispatch(fetchContent(params));
}
