import { handleActions } from "redux-actions";
import {
  GET_TEMPLATES_REQUEST, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_FAILURE, ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS,
  ADD_TEMPLATE_FAILURE, DELETE_TEMPLATE_REQUEST, DELETE_TEMPLATE_SUCCESS, DELETE_TEMPLATE_FAILURE
} from "./types";

const initialState = {
  data      : {},
  isLoading : false,
  error     : {},
};

const local = handleActions({
  [GET_TEMPLATES_REQUEST]   : (state) => ({
    ...state,
    isLoading : true,
  }),
  [GET_TEMPLATES_SUCCESS]   : (state, action) => {
    return {
      ...state,
      isLoading : false,
      data      : action.payload.data,
    };
  },
  [GET_TEMPLATES_FAILURE]   : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
  [ADD_TEMPLATE_REQUEST]    : (state) => ({
    ...state,
    isLoading : true,
  }),
  [ADD_TEMPLATE_SUCCESS]    : (state, action) => {
    return {
      ...state,
      isLoading : false,
      msg       : action.payload.data,
    };
  },
  [ADD_TEMPLATE_FAILURE]    : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
  [DELETE_TEMPLATE_REQUEST] : (state) => ({
    ...state,
    isLoading : true,
  }),
  [DELETE_TEMPLATE_SUCCESS] : (state, action) => {
    return {
      ...state,
      isLoading : false,
      msg       : action.payload.data,
    };
  },
  [DELETE_TEMPLATE_FAILURE] : (state, action) => ({
    ...state,
    isLoading : false,
    error     : action.payload.data,
  }),
}, initialState);

export default local;
