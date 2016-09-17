/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../../middleware/callAPI";
import {
  EDITOR_REQUEST, EDITOR_SUCCESS, EDITOR_FAILURE, EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDIT_SCHEMA_REQUEST,
  EDIT_SCHEMA_SUCCESS, EDIT_SCHEMA_FAILURE
} from "./types";
import * as api from "../api";

// Async Actions
export const getTemplate = params => ({
  [CALL_API] : {
    types    : [EDITOR_REQUEST, EDITOR_SUCCESS, EDITOR_FAILURE],
    callback : api.getTemplate(params),
  },
});

export const updateTemplate = params => ({
  [CALL_API] : {
    types    : [EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE],
    callback : api.updateTemplate(params),
  },
});

export const updateTemplateSchema = params => ({
  [CALL_API] : {
    types    : [EDIT_SCHEMA_REQUEST, EDIT_SCHEMA_SUCCESS, EDIT_SCHEMA_FAILURE],
    callback : api.updateTemplateSchema(params),
  },
});
