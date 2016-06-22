/**
 * Created by sharavan on 15/06/16.
 */
import React from "react";
import { connect } from "react-redux";
import { DG } from "../components/index";
import { Breadcrumb, Search, ContextMenu, Navigator } from "./common/index";
import { toggleSidebar } from "../actions/contextMenuAC";
import {
  sortColumn, toggleRow, selectAllRows, clearRowSelection, setDateModifiedStart, setDateModifiedEnd, setOwner,
  setIsRecent, setIsStarred
} from "../actions/contentAC";
import * as dg from "../data/datagrid";
import { getRows } from "../reducers/utils";
import cx from "classnames";
import styles from "./App.less";

class App extends React.Component {
  constructor(props) {
    super(props);

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
                callBack={props.sortColumn.bind(this, col.dataKey, sortOrders[i].order)}
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

    this.state = { rollUp : true };
    this.handleRollUpToggle = this.handleRollUpToggle.bind(this);
    this.colSortItems = {
      items,
      displayText,
    };
  }

  handleRollUpToggle() {
    this.setState({ rollUp : !this.state.rollUp });
  }

  render() {
    const { content, actionsMenu, rows } = this.props;
    const sortOrderIndex = content.filters.sortAscending ? 0 : 1;

    return (
      <div>
        {/* Roll Up/Down Gimmick */}
        <div
          onClick={this.handleRollUpToggle}
          className={cx({
            [styles.rollDownHandle] : !this.state.rollUp,
            [styles.rollUpHandle]   : this.state.rollUp,
          })}
        >
          <span />
        </div>

        {/* Fixed navigator header */}
        {this.state.rollUp ? <Navigator/> : ""}

        {/* Content Container */}
        <div
          fullWidth
          className={styles.contentBase}
          style={{ top: this.state.rollUp ? 62 : 0 }}
        >

          {/* Breadcrumb */}
          <Breadcrumb
            className={styles.breadcrumb}
          />

          {/* Contextual Menu */}
          <ContextMenu
            className={styles.contextMenu}
            toggleSidebar={this.props.toggleSidebar}
            actionsMenu={actionsMenu}
            countItems={content.selectedKeys.length}
            colSortItems={this.colSortItems.items}
            sortKey={this.colSortItems.displayText[content.filters.sortKey][sortOrderIndex]}
            selectAllRows={this.props.selectAllRows}
            clearRowSelection={this.props.clearRowSelection}
          />

          <div>
            {/* Search Container */}
            <Search
              className={styles.search}
              filterData={content.filters}
              changeHandlers={this.props.filterChangeHandlers}
            />

            {/* DataGrid Container */}
            <DG
              className={styles.datagrid}
              style={{ left: !actionsMenu.showSidebar && 0 }}
              cols={dg.cols}
              colWidths={dg.colWidths}
              rows={rows}
              colSortFunction={this.props.sortColumn}
              sortKey={content.filters.sortKey}
              sortAscending={content.filters.sortAscending}
              onRowClick={this.props.toggleRow}
              selectedKeys={content.selectedKeys}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    actionsMenu : state.contextMenu,
    content     : state.content,
    rows        : getRows(state.content.data, state.content.filters),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar        : () => dispatch(toggleSidebar()),
    selectAllRows        : () => dispatch(selectAllRows()),
    clearRowSelection    : () => dispatch(clearRowSelection()),
    sortColumn           : (sortKey, sortOrder) => dispatch(sortColumn(sortKey, sortOrder)),
    toggleRow            : (index) => dispatch(toggleRow(index)),
    filterChangeHandlers : {
      setDateModifiedStart : (e) => dispatch(setDateModifiedStart(e)),
      setDateModifiedEnd   : (e) => dispatch(setDateModifiedEnd(e)),
      setOwner             : (e) => dispatch(setOwner(e)),
      setIsRecent          : (e) => dispatch(setIsRecent(e)),
      setIsStarred         : (e) => dispatch(setIsStarred(e)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
