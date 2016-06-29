import { CALL_API } from "../middleware/callAPI";
import * as t from "./types";
import { getTemplateForEdit } from "./api";

// Async Actions
const loadEditor = (params) => {
  return {
    [CALL_API] : {
      types    : [t.EDITOR_REQUEST, t.EDITOR_SUCCESS, t.EDITOR_FAILURE],
      callback : getTemplateForEdit(params),
    },
  };
};

export { loadEditor };
