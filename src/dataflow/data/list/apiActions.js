/**
 * Created by sharavan on 09/09/16.
 */
import { CALL_API } from "../../middleware/callAPI";
import { GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE } from "./types";
import * as templateApi from "../../api";

/**
 * Load all the existing templates in the DB
 */
export const getTemplates = () => ({
  [CALL_API] : {
    types    : [GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE],
    callback : templateApi.getTemplates(),
  },
});

export const editTemplate = (params) => ({
  [CALL_API] : {
    types    : [GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE],
    callback : templateApi.updateTemplate(params),
  },
});
