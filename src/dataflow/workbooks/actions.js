import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";
import {
  GET_WORKBOOKS_FAILURE, GET_WORKBOOKS_REQUEST, GET_WORKBOOKS_SUCCESS, CREATE_WORKBOOK_FAILURE,
  CREATE_WORKBOOK_REQUEST, CREATE_WORKBOOK_SUCCESS, DELETE_WORKBOOK_REQUEST, DELETE_WORKBOOK_FAILURE,
  DELETE_WORKBOOK_SUCCESS
} from "./types";

const workbooksRequest = createAction(GET_WORKBOOKS_REQUEST);
const workbooksSuccess = createAction(GET_WORKBOOKS_SUCCESS, workbooks => ({ workbooks }));
const workbooksFailure = createAction(GET_WORKBOOKS_FAILURE, err => ({ err }));
export function getWorkbooks() {
  return dispatch => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    dispatch(workbooksRequest());

    return fetch("GET", "api/workbooks")
      .then(res => res.json())
      .then(workbooks => dispatch(workbooksSuccess(workbooks)))
      .catch(err => dispatch(workbooksFailure(err)));
  };
}

const createWorkbookRequest = createAction(CREATE_WORKBOOK_REQUEST);
const createWorkbookSuccess = createAction(CREATE_WORKBOOK_SUCCESS, json => ({
  workbook : json.data,
  message  : json.msg,
}));
const createWorkbookFailure = createAction(CREATE_WORKBOOK_FAILURE, err => ({ err }));
export function createWorkbook(data) {
  return dispatch => {
    dispatch(createWorkbookRequest());
    return fetch("POST", "api/workbooks", data)
      .then(res => res.json())
      .then(json => dispatch(createWorkbookSuccess(json)))
      .catch(err => dispatch(createWorkbookFailure(err)));
  };
}

const deleteWorkbookRequest = createAction(DELETE_WORKBOOK_REQUEST);
const deleteWorkbookSuccess = createAction(DELETE_WORKBOOK_SUCCESS, json => ({
  workbook : json.data,
  message  : json.msg,
}));
const deleteWorkbookFailure = createAction(DELETE_WORKBOOK_FAILURE, err => ({ err }));
export function deleteWorkbook(name) {
  return dispatch => {
    dispatch(deleteWorkbookRequest());

    return fetch("DELETE", `api/workbooks/${name}`)
      .then(res => res.json())
      .then(json => dispatch(deleteWorkbookSuccess(json)))
      .catch(err => dispatch(deleteWorkbookFailure(err)));
  };
}
