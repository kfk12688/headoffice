import { createAction } from "redux-actions";
import { ON_CHANGE, DESTROY, RESET_FORM, POPULATE } from "./types";
import getValue from "./getValue";

export const onChange = createAction(ON_CHANGE, (field, event) => ({
  value : getValue(event),
  name  : field,
}));

export const resetForm = createAction(RESET_FORM);
export const destroy = createAction(DESTROY);

export const populate = createAction(POPULATE, data => ({
  data,
}));
