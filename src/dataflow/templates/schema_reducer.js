import R from "ramda";
import { loaded, set, loadCollection, setFailure, setMessage } from "utils";
import {
  ADD_SCHEMA_REQUEST, ADD_SCHEMA_SUCCESS, ADD_SCHEMA_FAILURE, DELETE_SCHEMA_REQUEST, DELETE_SCHEMA_SUCCESS,
  DELETE_SCHEMA_FAILURE, UPDATE_SCHEMA_REQUEST, UPDATE_SCHEMA_SUCCESS, UPDATE_SCHEMA_FAILURE
} from "./types";

const schemaReducer = {
  [ADD_SCHEMA_REQUEST]    : (state, action) => loadCollection(action.payload.collectionName, state),
  [ADD_SCHEMA_SUCCESS]    : (state, action) => setMessage(action.payload.message, state),
  [ADD_SCHEMA_FAILURE]    : (state, action) => setFailure(action.payload.error, state),
  [DELETE_SCHEMA_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [DELETE_SCHEMA_SUCCESS] : (state, action) => {
    const { collectionName, template, message } = action.payload;
    const setData                               = R.compose(
      setMessage(message),
      set("userSchema", template.userSchema, collectionName),
      loaded(collectionName),
      loaded("list"),
    );

    return setData(state);
  },
  [DELETE_SCHEMA_FAILURE] : (state, action) => setFailure(action.payload.error, state),
  [UPDATE_SCHEMA_REQUEST] : (state, action) => loadCollection(action.payload.collectionName, state),
  [UPDATE_SCHEMA_SUCCESS] : (state, action) => setMessage(action.payload.message, state),
  [UPDATE_SCHEMA_FAILURE] : (state, action) => setFailure(action.payload.error, state),
};

export default schemaReducer;
