import { getData, getSpec } from "./apiActions";

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
