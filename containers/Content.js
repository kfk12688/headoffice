import React, { Component } from "react";
import { connect } from "react-redux";
import { getRows } from "../reducers";
import { Breadcrumb, ContextMenu, Search } from "./common";
import { DG } from "../components";
import * as dg from "../data/datagrid";
import * as actions from "../actions";
import styles from "./Content.less";

class Content extends Component {
  constructor(props) {
    super(props);
    this.colSortItems = this.getColumnSortList(props.sortColumn);
  }

  getColumnSortList(cb) {
    const sortOrders = [
      {
        date   : "New - Old",
        number : "Least - Most",
        order  : "asc",
        text   : "A-Z",
        link   : "A-Z",
      }, {
        date   : "Old - New",
        number : "Most - Least",
        order  : "desc",
        text   : "Z-A",
        link   : "Z-A",
      },
    ];
    const items = [];
    const displayText = {};
    const cols = dg.cols;

    for (const colIdx in cols) {
      if (cols.hasOwnProperty(colIdx)) {
        const col = cols[colIdx];
        const isColSortable = (col.sortable === undefined) || col.sortable;

        if (isColSortable) {
          const colRenderType = (col.renderType === undefined) ? "text" : col.renderType;
          displayText[col.dataKey] = {};
          for (let i = 0; i < 2; i++) {
            items.push(
              <div
                callBack={cb.bind(this, col.dataKey, sortOrders[i].order)}
                dataKey={col.dataKey}
                key={`${colIdx}${i}`}
              >
                {`${col.text} (${sortOrders[i][colRenderType]})`}
              </div>
            );

            displayText[col.dataKey][i] = col.text + " (" + sortOrders[i][colRenderType] + ")";
          }
        }
      }
    }

    return {
      items,
      displayText,
    }
  }

  componentWillMount() {
    this.props.loadContentData();
  }

  render() {
    const { list, actionsMenu, rows, children } = this.props;
    const sortOrderIndex = list.filters.sortAscending ? 0 : 1;
    const {
      rollUp,
      toggleSidebar,
      selectAllRows,
      clearRowSelection,
      filterChangeHandlers,
      sortColumn,
      toggleRow,
    } = this.props;

    // Content Container
    return (
      <div
        fullWidth
        className={styles.base}
        style={{ top: rollUp ? 62 : 0 }}
      >

        {/* Breadcrumb */}
        <Breadcrumb
          className={styles.breadcrumb}
        />

        {/* Contextual Menu */}
        <ContextMenu
          className={styles.contextMenu}
          toggleSidebar={toggleSidebar}
          actionsMenu={actionsMenu}
          countItems={list.selectedKeys.length}
          colSortItems={this.colSortItems.items}
          sortKey={this.colSortItems.displayText[list.filters.sortKey][sortOrderIndex]}
          selectAllRows={selectAllRows}
          clearRowSelection={clearRowSelection}
        />

        <div>
          {/* Search Container */}
          <Search
            className={styles.search}
            filterData={list.filters}
            changeHandlers={filterChangeHandlers}
          />

          {/* DataGrid Container */}
          <DG
            className={styles.datagrid}
            style={{ left: !actionsMenu.showSidebar && 0 }}
            isLoading={list.isLoading}
            cols={dg.cols}
            colWidths={dg.colWidths}
            rows={rows}
            colSortFunction={sortColumn}
            sortKey={list.filters.sortKey}
            sortAscending={list.filters.sortAscending}
            onRowClick={toggleRow}
            selectedKeys={list.selectedKeys}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    actionsMenu : state.contextMenu,
    list        : state.list,
    rows        : getRows(state.list.data, state.list.filters),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar        : () => dispatch(actions.toggleSidebar()),
    selectAllRows        : () => dispatch(actions.selectAllRows()),
    clearRowSelection    : () => dispatch(actions.clearRowSelection()),
    sortColumn           : (sortKey, sortOrder) => dispatch(actions.sortColumn(sortKey, sortOrder)),
    toggleRow            : (index) => dispatch(actions.toggleRow(index)),
    loadContentData      : (params) => dispatch(actions.loadTemplate(params)),
    filterChangeHandlers : {
      setDateModifiedStart : (e) => dispatch(actions.setDateModifiedStart(e)),
      setDateModifiedEnd   : (e) => dispatch(actions.setDateModifiedEnd(e)),
      setOwner             : (e) => dispatch(actions.setOwner(e)),
      setIsRecent          : (e) => dispatch(actions.setIsRecent(e)),
      setIsStarred         : (e) => dispatch(actions.setIsStarred(e)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
