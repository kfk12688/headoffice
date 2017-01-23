import R from "ramda";
import {
  GET_WORKBOOKS_FAILURE, GET_WORKBOOKS_REQUEST, GET_WORKBOOKS_SUCCESS, CREATE_WORKBOOK_FAILURE,
  CREATE_WORKBOOK_REQUEST, CREATE_WORKBOOK_SUCCESS, DELETE_WORKBOOK_REQUEST, DELETE_WORKBOOK_FAILURE,
  DELETE_WORKBOOK_SUCCESS
} from "./types";
import { setFailure, set, unset, loaded, loading, setMessage } from "utils";

const reducer = {
  [GET_WORKBOOKS_REQUEST] : (state) => loading("list", state),
  [GET_WORKBOOKS_SUCCESS] : (state, action) => {
    const { workbooks } = action.payload;
    const setData       = R.compose(
      set("data", workbooks, "list"),
      loaded("list"),
    );
    return setData(state);
  },
  [GET_WORKBOOKS_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  [CREATE_WORKBOOK_REQUEST] : (state) => loading("list", state),
  [CREATE_WORKBOOK_SUCCESS] : (state, action) => {
    const { workbook, message } = action.payload;
    const setData               = R.compose(
      setMessage(message),
      set(["data", workbook.id], workbook, "list"),
      loaded("list"),
    );
    return setData(state);
  },
  [CREATE_WORKBOOK_FAILURE] : (state, action) => setFailure(action.payload.err, state),

  [DELETE_WORKBOOK_REQUEST] : (state) => loading("list", state),
  [DELETE_WORKBOOK_SUCCESS] : (state, action) => {
    const { workbook, message } = action.payload;
    const setData               = R.compose(
      setMessage(message),
      unset(["data", workbook.id], workbook, "list"),
      loaded("list"),
    );
    return setData(state);
  },
  [DELETE_WORKBOOK_FAILURE] : (state, action) => setFailure(action.payload.err, state),
};

export default reducer;
