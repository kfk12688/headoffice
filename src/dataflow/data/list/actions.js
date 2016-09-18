import { clearFilterState } from "../../filter/actions";
import { clearMenuState } from "../../menu/actions";
import { getTemplates, editTemplate } from "./apiActions";

export function loadTemplate() {
  return (dispatch) => {
    dispatch(clearFilterState());
    dispatch(clearMenuState());
    dispatch(getTemplates());
  };
}

/**
 * Mark templates as favorites
 */
export function makeFavorite(params) {
  return dispatch => {
    let promise = null;

    if (Array.isArray(params)) {
      promise = params.map(obj => dispatch(editTemplate(obj)));
      promise = Promise.all(promise);
    } else {
      promise = dispatch(editTemplate(params));
    }

    promise.then(dispatch(loadTemplate()));
  };
}
