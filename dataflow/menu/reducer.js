/**
 * Created by sharavan on 15/06/16.
 */
import { handleActions } from "redux-actions";
import * as t from "./types";

const initialState = {
  showSidebar : true,
};

const reducer = handleActions({
  [t.TOGGLE_MENU_SIDEBAR] : (state) => ({
    ...state,
    showSidebar : !state.showSidebar,
  }),
  [t.CLEAR_MENU_STATE]    : () => initialState,
}, initialState);

export default reducer;
