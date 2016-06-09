/**
 * Created by sharavan on 16/06/16.
 */

import { data } from "../data/datagrid";
import { CONTENT_ACTIONS } from "../actions/contentAC";
import { IContentState, IContentReducer } from "../models/contentModel";

const contentState: IContentState = {
  sortKey      : "name",
  sortAscending: true,
  data         : data,
  countSelected: 0
}

const contentReducer: IContentReducer = (state = contentState, action) => {
  switch (action.type) {
    case CONTENT_ACTIONS.SORT_COLUMN:
      let sortKey   = action.sortKey
      let sortOrder = action.sortOrder

      if (sortOrder === "asc") {
        let sortedData = state.data.sort((a, b) => {
          return +(a[sortKey] > b[sortKey]) || +(a[sortKey] === b[sortKey]) - 1
        })

        return Object.assign({}, state, {
          data         : sortedData,
          sortAscending: true,
          sortKey
        })

      } else if (sortOrder === "desc") {
        let sortedData = state.data.sort((a, b) => {
          return +(a[sortKey] < b[sortKey])
        })

        return Object.assign({}, state, {
          data         : sortedData,
          sortAscending: false,
          sortKey
        })
      }
      return;

    case CONTENT_ACTIONS.TOGGLE_ROW:
      let idx   = action.index
      let row   = state.data[idx]
      let count = 0

      if (row.isSelected) {
        row.isSelected = false
        count          = state.countSelected - 1
      } else {
        row.isSelected = true
        count          = state.countSelected + 1
      }

      let newData = state.data
        .slice(0, idx)
        .concat([row], state.data.slice(idx + 1))

      return Object.assign({}, state, {
        data         : newData,
        countSelected: count
      })

    case CONTENT_ACTIONS.SELECT_ALL_ROWS:
      return Object.assign({}, state, {
        data : state.data.map((e) => {
          e.isSelected = true
          return e
        }),
        countSelected: state.data.length
      })

    case CONTENT_ACTIONS.CLEAR_ROW_SELECTION:
      return Object.assign({}, state, {
        data : state.data.map((e) => {
          e.isSelected = false
          return e
        }),
        countSelected: 0
      })

    default:
      return state
  }
}

export default contentReducer
