import { createAction } from "redux-actions";
import { ADD_CURRENT_USER, REMOVE_CURRENT_USER } from "./types";

export const addCurrentUser = createAction(ADD_CURRENT_USER, data => ({ data }));
export const removeCurrentUser = createAction(REMOVE_CURRENT_USER);
