import { handleActions } from "redux-actions";
import { SPEC_REQUEST, SPEC_SUCCESS, SPEC_FAILURE, DATA_REQUEST, DATA_SUCCESS, DATA_FAILURE } from "./types";

const initialState = {
  // Object of objects with key as the template id
  spec      : [],
  data      : {},
  error     : {
    code : "",
    msg  : "",
  },
  isLoading : false,
};

const reducer = handleActions({

  /**
   * Specification for data entry in the table
   */
  [SPEC_REQUEST] : state => ({
    ...state,
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
    error : action.payload.data,
  }),

  /**
   * Updates server data in the store for the particular template
   */
  [DATA_REQUEST] : state => ({
    ...state,
    isLoading : true,
  }),
  [DATA_SUCCESS] : (state, action) => ({
    ...state,
    data      : {
      ...state.data,
      ...action.payload.data,
    },
    isLoading : false,
  }),
  [DATA_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),

}, initialState);

export default reducer;
