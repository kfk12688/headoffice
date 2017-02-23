import { compose, setFailure, set, unset, loaded, loading, setMessage } from "utils";
import { GET_WORKBOOKS_FAILURE, GET_WORKBOOKS_REQUEST, GET_WORKBOOKS_SUCCESS, CREATE_WORKBOOK_FAILURE, CREATE_WORKBOOK_REQUEST, CREATE_WORKBOOK_SUCCESS, DELETE_WORKBOOK_REQUEST, DELETE_WORKBOOK_FAILURE, DELETE_WORKBOOK_SUCCESS } from "./types";

const reducer = {
  [GET_WORKBOOKS_REQUEST] : (state) => loading("list", state),
  [GET_WORKBOOKS_SUCCESS] : (state, action) => {
    const { data } = action.payload;
    const setData  = compose(
      set("data", data, "list"),
      loaded("list"),
    );
    return setData(state);
  },
  [GET_WORKBOOKS_FAILURE] : (state, action) => setFailure(action.payload, state),

  [CREATE_WORKBOOK_REQUEST] : (state) => loading("list", state),
  [CREATE_WORKBOOK_SUCCESS] : (state, action) => {
    const { data, message } = action.payload;
    const setData           = compose(
      setMessage(message),
      set(["data", data.id], data, "list"),
      loaded("list"),
    );
    return setData(state);
  },
  [CREATE_WORKBOOK_FAILURE] : (state, action) => setFailure(action.payload, state),

  [DELETE_WORKBOOK_REQUEST] : (state) => loading("list", state),
  [DELETE_WORKBOOK_SUCCESS] : (state, action) => {
    const { data, message } = action.payload;
    const setData           = compose(
      setMessage(message),
      unset(["data", data.id], data, "list"),
      loaded("list"),
    );
    return setData(state);
  },
  [DELETE_WORKBOOK_FAILURE] : (state, action) => setFailure(action.payload, state),
};

export default reducer;
