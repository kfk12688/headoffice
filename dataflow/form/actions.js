import { createAction } from "redux-actions";
import { ON_CHANGE, DESTROY, RESET_FORM, POPULATE } from "./types";

const isDefined = variable =>
  (variable !== undefined) && (variable !== null);

export const onChange = createAction(ON_CHANGE, (field, event) => {
  const value = isDefined(event) && isDefined(event.target) && isDefined(event.target.value) ?
                event.target.value :
                event;

  return {
    value,
    name : field,
  };
});

export const resetForm = createAction(RESET_FORM);
export const destroy = createAction(DESTROY);

export const populate = createAction(POPULATE, data => ({
  data,
}));
