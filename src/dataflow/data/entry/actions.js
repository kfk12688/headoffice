import { getSpec, createRow } from "./apiActions";

/**
 * Get the template specification
 */
export const loadSpec = params => (dispatch) =>
  dispatch(getSpec(params));

/**
 * Add a new row
 */
export const addRow = params => dispatch =>
  dispatch(createRow(params));
