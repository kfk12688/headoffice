import { createAction } from "redux-actions";
import { ON_CHANGE, DESTROY, RESET_FORM } from "./types";

export const onChange = createAction(ON_CHANGE, (field, event) => {
  // fixme : this workaround needs to be fixed
  const value = (event.target !== undefined) && (event.target.value !== undefined) ?
                event.target.value :
                event;

  return {
    value,
    name : field,
  };
});

export const resetForm = createAction(RESET_FORM);
export const destroy = createAction(DESTROY);
