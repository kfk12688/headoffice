/**
 * Created by sharavan on 15/06/16.
 */
const CONTEXT_MENU_ACTIONS = {
  // Shows/hides the sidebar
  TOGGLE_SIDEBAR_VISIBILITY      : "TOGGLE_SIDEBAR_VISIBILITY",
  TOGGLE_ACTIONS_MENU_VISIBILITY : "TOGGLE_ACTIONS_MENU_VISIBILITY",
  SET_SORT_HELPER_VISIBILITY     : "SET_SORT_HELPER_VISIBILITY",
};

function toggleSidebar() {
  return {
    type : CONTEXT_MENU_ACTIONS.TOGGLE_SIDEBAR_VISIBILITY,
  };
}

function toggleActionsMenu() {
  return {
    type : CONTEXT_MENU_ACTIONS.TOGGLE_ACTIONS_MENU_VISIBILITY,
  };
}

function setSortHelperVisibility(isVisible) {
  return {
    type : CONTEXT_MENU_ACTIONS.SET_SORT_HELPER_VISIBILITY,
    isVisible,
  };
}

export { CONTEXT_MENU_ACTIONS };
export { toggleSidebar, toggleActionsMenu, setSortHelperVisibility };
