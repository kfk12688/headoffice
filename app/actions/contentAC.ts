/**
 * Created by sharavan on 16/06/16.
 */
import { IAction } from "redux";

const CONTENT_ACTIONS = {
  SORT_COLUMN: "SORT_COLUMN",
  TOGGLE_ROW : "TOGGLE_ROW",
  SELECT_ALL_ROWS : "SELECT_ALL_ROWS",
  CLEAR_ROW_SELECTION : "CLEAR_ROW_SELECTION"
}

const sortColumn = function (sortKey: string, sortOrder: string): IAction {
  return {
    type: CONTENT_ACTIONS.SORT_COLUMN,
    sortKey,
    sortOrder
  }
}

const toggleRow = (index: number): IAction => {
  return {
    type: CONTENT_ACTIONS.TOGGLE_ROW,
    index
  }
}

const selectAllRows = (): IAction => {
  return {
    type: CONTENT_ACTIONS.SELECT_ALL_ROWS
  }
}

const clearRowSelection = (): IAction => {
  return {
    type: CONTENT_ACTIONS.CLEAR_ROW_SELECTION
  }
}

export { CONTENT_ACTIONS }
export { sortColumn, toggleRow, selectAllRows, clearRowSelection }
