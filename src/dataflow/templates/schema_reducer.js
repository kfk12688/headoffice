import { compose, loaded, set, loadingCollection, setFailure, setMessage } from "utils";
import { ADD_SCHEMA_REQUEST, ADD_SCHEMA_SUCCESS, ADD_SCHEMA_FAILURE, DELETE_SCHEMA_REQUEST, DELETE_SCHEMA_SUCCESS, DELETE_SCHEMA_FAILURE, UPDATE_SCHEMA_REQUEST, UPDATE_SCHEMA_SUCCESS, UPDATE_SCHEMA_FAILURE } from "./types";

const schemaReducer = {
  [ADD_SCHEMA_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [ADD_SCHEMA_SUCCESS] : (state, action) => setMessage(action.payload.message, state),
  [ADD_SCHEMA_FAILURE] : (state, action) => setFailure(action.payload, state),

  [DELETE_SCHEMA_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [DELETE_SCHEMA_SUCCESS] : (state, action) => {
    const { collectionName, data, message } = action.payload;
    const setData                           = compose(
      setMessage(message),
      set("userSchema", data, collectionName),
      loaded(collectionName),
      loaded("list"),
    );
    return setData(state);
  },
  [DELETE_SCHEMA_FAILURE] : (state, action) => setFailure(action.payload, state),

  [UPDATE_SCHEMA_REQUEST] : (state, action) => loadingCollection(action.payload.collectionName, state),
  [UPDATE_SCHEMA_SUCCESS] : (state, action) => setMessage(action.payload.message, state),
  [UPDATE_SCHEMA_FAILURE] : (state, action) => setFailure(action.payload, state),
};

export default schemaReducer;
