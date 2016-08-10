import { handleActions } from "redux-actions";
import { ON_CHANGE, RESET_FORM, DESTROY } from "./types";

const initialState = {};

const reducer = handleActions({
  [ON_CHANGE]     : (state, action) => {
    const { name, value } = action.payload;

    return {
      ...state,
      [name] : { value },
    };
  },
  [RESET_FORM] : () => initialState,
  [DESTROY] : () => initialState,
}, initialState);

export default reducer;
