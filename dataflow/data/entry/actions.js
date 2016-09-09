import { getData, getSpec, editRow, removeRow, createRow } from "./apiActions";

/**
 * Get the available data for the requested template
 */
export const loadData = params => dispatch =>
  dispatch(getData(params));

/**
 * Get the template specification
 */
export const loadSpec = params => (dispatch) =>
  dispatch(getSpec(params))
    .then(dispatch(loadData(params)));

/**
 * Update an existing row in the collection
 */
export const updateRow = params => dispatch =>
  dispatch(editRow(params))
    .then(dispatch(loadData(params)));

/**
 * Delete an existing row from the collection
 */
export const deleteRow = params => dispatch =>
  dispatch(removeRow(params))
    .then(dispatch(loadData(params)));

/**
 * Add a new row
 */
export const addRow = params => dispatch =>
  dispatch(createRow(params))
    .then(dispatch(loadData(params)));
