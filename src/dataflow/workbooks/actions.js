import fetch from "../fetchWrapper";
import { createAction } from "redux-actions";
import { clearFilterState } from "../filter/actions";
import { clearMenuState } from "../menu/actions";
import {
  WORKBOOK_REQUEST, WORKBOOK_SUCCESS, WORKBOOK_FAILURE, NEW_WORKBOOK_REQUEST, NEW_WORKBOOK_SUCCESS,
  NEW_WORKBOOK_FAILURE, DELETE_WORKBOOK_FAILURE, DELETE_WORKBOOK_REQUEST, DELETE_WORKBOOK_SUCCESS,
} from "./types";

const workbooksRequest = createAction(WORKBOOK_REQUEST);
const workbooksSuccess = createAction(WORKBOOK_SUCCESS, workbooks => ({ workbooks }));
const workbooksFailure = createAction(WORKBOOK_FAILURE, err => ({ err }));
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

const createWorkbookRequest = createAction(NEW_WORKBOOK_REQUEST);
const createWorkbookSuccess = createAction(NEW_WORKBOOK_SUCCESS, workbook => ({ workbook }));
const createWorkbookFailure = createAction(NEW_WORKBOOK_FAILURE, err => ({ err }));
export function createWorkbook() {
  return dispatch => {
    dispatch(createWorkbookRequest());
    return fetch("POST", "api/workbooks")
      .then(res => res.json())
      .then(workbook => dispatch(createWorkbookSuccess(workbook)))
      .catch(err => dispatch(createWorkbookFailure(err)));
  };
}

const deleteWorkbookRequest = createAction(DELETE_WORKBOOK_REQUEST);
const deleteWorkbookSuccess = createAction(DELETE_WORKBOOK_SUCCESS, workbook => ({ workbook }));
const deleteWorkbookFailure = createAction(DELETE_WORKBOOK_FAILURE, err => ({ err }));
export function deleteWorkbook() {
  return dispatch => {
    dispatch(deleteWorkbookRequest());

    return fetch("DELETE", `api/workbooks/${name}`)
      .then(res => res.json())
      .then(workbook => dispatch(deleteWorkbookSuccess(workbook)))
      .catch(err => dispatch(deleteWorkbookFailure(err)));
  };
}
