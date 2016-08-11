import { handleActions } from "redux-actions";
import {
  SET_EDIT_FLAG, CLEAR_EDIT_FLAG, DELETE, ERROR, EDIT_FAILURE, EDIT_REQUEST, EDIT_SUCCESS, EDITOR_SUCCESS,
  EDITOR_FAILURE, EDITOR_REQUEST
} from "./types";

const initialState = {
  // Object of objects with key as the template id
  primaryKey  : "fieldName",
  data        : {},
  postData    : {},
  isLoading   : false,
  error       : {},
  selectedRow : null,
  msg         : "",
};

const reducer = handleActions({
  [EDITOR_REQUEST]  : (state) => ({
    ...state,
    isLoading : true,
  }),
  [EDITOR_SUCCESS]  : (state, action) => ({
    ...state,
    data      : action.payload.data,
    isLoading : false,
  }),
  [EDITOR_FAILURE]  : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),
  [EDIT_REQUEST]    : (state) => ({
    ...state,
    isLoading : true,
  }),
  [EDIT_SUCCESS]    : (state, action) => ({
    ...state,
    msg       : action.payload.data,
    isLoading : false,
  }),
  [EDIT_FAILURE]    : (state, action) => ({
    ...state,
    error     : action.payload.data,
    isLoading : false,
  }),
  [SET_EDIT_FLAG]   : (state, action) => {
    const { row } = action.payload;
    const { fields } = state.data;
    const { primaryKey } = state;
    const rowId = fields.findIndex(field => row[primaryKey].val === field[primaryKey].val);

    return {
      ...state,
      selectedRow : rowId.toString(),
    };
  },
  [CLEAR_EDIT_FLAG] : state => ({
    ...state,
    selectedRow : null,
  }),
}, initialState);

export default reducer;
