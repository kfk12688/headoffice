import R from "ramda";
import { set, selectAll, deselectAll } from "utils";
import { TOGGLE_CONTENT_SELECTION, SELECT_ALL_CONTENT, DESELECT_ALL_CONTENT } from "./types";

const menuReducer = {
  [SELECT_ALL_CONTENT]       : (state) => selectAll(state.list.data)(state),
  [DESELECT_ALL_CONTENT]     : (state) => deselectAll(state.list.data)(state),
  [TOGGLE_CONTENT_SELECTION] : (state, action) => {
    const { collectionName } = action.payload;
    let isSelected           = R.path(["list", "data", collectionName, "isSelected"])(state);
    if (isSelected === undefined) isSelected = false;
    return set(["data", collectionName, "isSelected"], !isSelected, "list")(state);
  },
};

export default menuReducer;
