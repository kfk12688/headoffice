import { handleActions } from "redux-actions";
import { SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, ADD_ROW_REQUEST, ADD_ROW_SUCCESS, ADD_ROW_FAILURE } from "./types";

const initialState = {
  // Object of objects with key as the template id
  spec      : [],
  message   : {},
  isLoading : false,
};

const reducer = handleActions({
  /**
   * Specification for data entry in the table
   */
  [SPEC_REQUEST] : state => ({
    ...state,
    spec : [],
  }),
  [SPEC_SUCCESS] : (state, action) => {
    const { userSchema, ...rest } = action.payload.data;

    return {
      ...state,
      ...rest,
      spec : userSchema,
    };
  },
  [SPEC_FAILURE] : (state, action) => ({
    ...state,
    message : action.payload.data,
  }),

  /**
   * Adds a row into the template collection
   */
  [ADD_ROW_REQUEST] : state => ({
    ...state,
  }),
  [ADD_ROW_SUCCESS] : (state, action) => ({
    ...state,
    message : action.payload.data,
  }),
  [ADD_ROW_FAILURE] : (state, action) => ({
    ...state,
    message : action.payload.data,
  }),
}, initialState);

export default reducer;
