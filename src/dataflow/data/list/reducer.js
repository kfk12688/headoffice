import { handleActions } from "redux-actions";
import { GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE } from "./types";

const initialState = {
  data      : {},
  isLoading : false,
  error     : {},
};

const local = handleActions({
  [GET_TEMPLATES_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [GET_TEMPLATES_SUCCESS] : (state, action) => ({
    ...state,
    isLoading : false,
    data      : action.payload.data,
  }),
  [GET_TEMPLATES_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.err,
  }),
}, initialState);

export default local;
