import { handleActions } from "redux-actions";
import { ON_CHANGE, RESET_FORM, DESTROY, POPULATE } from "./types";

const initialState = {};

const reducer = handleActions({
  [ON_CHANGE]  : (state, action) => {
    const { name, value } = action.payload;

    return {
      ...state,
      [name] : { value },
    };
  },
  [POPULATE]   : (state, action) => {
    const { data } = action.payload;
    const formKeys = Object.keys(data);
    const newFormValues = {};

    formKeys.forEach(key => {
      newFormValues[key] = {
        value : data[key],
      };
    });

    return {
      ...newFormValues,
    };
  },
  [RESET_FORM] : () => initialState,
  [DESTROY]    : () => initialState,
}, initialState);

export default reducer;
