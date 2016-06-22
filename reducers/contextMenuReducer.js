/**
 * Created by sharavan on 15/06/16.
 */
import { CONTEXT_MENU_ACTIONS } from "../actions/contextMenuAC";

const initialState = {
  showActionsMenu   : false,
  showSidebar       : true,
  showSortingHelper : true,
}

const contextMenuReducer = (state = initialState, action) => {
  switch (action.type) {

    case CONTEXT_MENU_ACTIONS.TOGGLE_SIDEBAR_VISIBILITY:
      return Object.assign({}, state, {
        showSidebar: !state.showSidebar
      })

    case CONTEXT_MENU_ACTIONS.TOGGLE_ACTIONS_MENU_VISIBILITY:
      return Object.assign({}, state, {
        showActionsMenu: !state.showActionsMenu
      })

    case CONTEXT_MENU_ACTIONS.SET_SORT_HELPER_VISIBILITY:
      return Object.assign({}, state, {
        showSortingHelper: action.isVisible
      })

    default:
      return state
  }
}

export default contextMenuReducer
