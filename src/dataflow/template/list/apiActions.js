/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../../middleware/callAPI";
import {
  GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS,
  ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE
} from "./types";
import * as api from "../api";

export const getTemplates = () => ({
  [CALL_API] : {
    types    : [GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE],
    callback : api.getTemplates(),
  },
});

export const createTemplate = params => ({
  [CALL_API] : {
    types    : [ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE],
    callback : api.createTemplate(params),
  },
});

export const removeTemplate = params => ({
  [CALL_API] : {
    types    : [DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE],
    callback : api.deleteTemplate(params),
  },
});

export const editTemplate = params => ({
  [CALL_API] : {
    types    : [GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE],
    callback : api.updateTemplate(params),
  },
});
