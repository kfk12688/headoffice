import { createAction } from "redux-actions";
import { CALL_API } from "../../middleware/callAPI";
import {
  SET_EDIT_FLAG, CLEAR_EDIT_FLAG, SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE,
  UPDATE_ROW_REQUEST, UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE, DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS,
  DELETE_ROW_FAILURE, ADD_ROW_REQUEST, ADD_ROW_SUCCESS, ADD_ROW_FAILURE
} from "./types";
import { populate as populateForm } from "../../form/actions";
import * as api from "./api";

/**
 * Get the template specification
 */
const _getSpec = params => ({
  [CALL_API] : {
    types    : [SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE],
    callback : api.getSpec(params),
  },
});
export const loadSpec = params => (dispatch) =>
  dispatch(_getSpec(params))
    .then(dispatch(loadData(params)));

/**
 * Get the available data for the requested template
 */
const _getData = params => ({
  [CALL_API] : {
    types    : [DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE],
    callback : api.getData(params),
  },
});
export const loadData = params => dispatch =>
  dispatch(_getData(params));

/**
 * Update an existing row in the collection
 */
const _updateRow = params => ({
  [CALL_API] : {
    types    : [UPDATE_ROW_REQUEST, UPDATE_ROW_SUCCESS, UPDATE_ROW_FAILURE],
    callback : api.updateRow(params),
  },
});
export const updateRow = params => dispatch =>
  dispatch(_updateRow(params))
    .then(dispatch(loadData(params)));

/**
 * Delete an existing row from the collection
 */
const _deleteRow = params => ({
  [CALL_API] : {
    types    : [DELETE_ROW_REQUEST, DELETE_ROW_SUCCESS, DELETE_ROW_FAILURE],
    callback : api.deleteRow(params),
  },
});
export const deleteRow = params => dispatch =>
  dispatch(_deleteRow(params))
    .then(dispatch(loadData(params)));


/**
 * Delete an existing row from the collection
 */
const _addRow = params => ({
  [CALL_API] : {
    types    : [ADD_ROW_REQUEST, ADD_ROW_SUCCESS, ADD_ROW_FAILURE],
    callback : api.addRow(params),
  },
});
export const addRow = params => dispatch =>
  dispatch(_addRow(params))
    .then(dispatch(loadData(params)));


// Actions that control the embedded form in TemplateEntry_Editor --> EntryGrid
const _setEditFlag = createAction(SET_EDIT_FLAG, row => ({ row }));
export const editRow = row => dispatch => {
  dispatch(_setEditFlag(row));
  dispatch(populateForm(row));
};
export const clearEditFlag = createAction(CLEAR_EDIT_FLAG);
