import React, { Component } from "react";
import { connect } from "react-redux";
import { DG, Breadcrumb, Search } from "components";
import { ContentMenu } from "./ContentMenu";
import * as cmActions from "../../dataflow/menu/actions";
import * as filterActions from "../../dataflow/filter/actions";
import { loadWorkbooks, addNewWorkbook, deleteWorkbook } from "../../dataflow/workbooks/actions";
import { getRows, Formatter as formatter } from "../utils";
import styles from "./Workbooks.less";

class Workbooks extends Component {
  constructor(props) {
    super(props);
    this.getActions = this.getActions.bind(this);
    const actions = this.getActions();
    this.actionsCollection = [
      { name : "Delete Workbook", handler : actions.deleteWorkbook },
    ];

    this.colSpec = [
      {
        headerStyle : { borderRight : 0 },
        name        : "has-alert-col",
        renderType  : "checkbox",
        sortable    : false,
        text        : "",
      },
      {
        dataKey    : "name",
        name       : "name-col",
        renderType : "link",
        actions    : this.actionsCollection,
        text       : "Display Name",
        linkRef    : {
          path   : "/user/edit",
          urlKey : "id",
        },
      },
      {
        cellFormatter : formatter.toDate,
        dataKey       : "createdAt",
        name          : "created-at-col",
        renderType    : "date",
        sortable      : true,
        text          : "Created At",
      },
    ];
    this.colWidths = {
      "has-alert-col"  : 38,
      "name-col"       : 260,
      "created-at-col" : 160,
    };
    this.colSortItems = this.getColumnSortList(props.sortColumn);
  }

  componentWillMount() {
    this.props.loadWorkbooks();
  }

  componentWillReceiveProps(nextProps) {
    const userData = Object.keys(this.props.workbooks.data);
    const nextUserData = Object.keys(nextProps.workbooks.data);

    if (nextUserData.length !== userData.length) {
      this.props.loadWorkbooks();
    }
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
    const cols = this.colSpec;

    for (const colIdx in cols) {
      if (cols.hasOwnProperty(colIdx)) {
        const col = cols[colIdx];
        const isColSortable = (col.sortable === undefined) || col.sortable;

        if (isColSortable) {
          const colRenderType = (col.renderType === undefined) ? "text" : col.renderType;
          displayText[col.dataKey] = {};
          for (let i = 0; i < 2; i++) {
            const name = `${col.text} (${sortOrders[i][colRenderType]})`;

            items.push(
              <div
                callBack={cb.bind(this, col.dataKey, sortOrders[i].order)}
                dataKey={col.dataKey}
                key={`${colIdx}${i}`}
              >
                {name}
              </div>
            );

            displayText[col.dataKey][i] = name;
          }
        }
      }
    }

    return {
      items,
      displayText,
    };
  }

  getActions() {
    const _deleteWorkbook = () => {
      const { deleteWorkbook, actionsMenu: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        deleteWorkbook({ id : selectedKeys });
      } else {
        deleteWorkbook({ id : selectedKeys[0] });
      }
    };

    return {
      deleteWorkbook : _deleteWorkbook,
    };
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }

    const {
      workbooks, filter, actionsMenu, rows, toggleSidebar, selectAllRows, clearRowSelection, filterChangeHandlers,
      sortColumn, toggleRow,
    } = this.props;

    const sortOrderIndex = filter.sortAscending ? 0 : 1;
    const sortKey = filter.sortKey ? this.colSortItems.displayText[filter.sortKey][sortOrderIndex] : null;

    const searchConfig = [
      {
        label         : "WorkBook",
        data          : filter.workbook,
        changeHandler : filterChangeHandlers.setWorkbookName,
        type          : "searchbox",
      },
      {
        label         : "Created by User",
        data          : filter.createdBy,
        changeHandler : filterChangeHandlers.setCreatedBy,
        type          : "searchbox",
      },
      {
        label         : "Created on or after",
        data          : filter.dateModifiedStart,
        changeHandler : filterChangeHandlers.setDateModifiedStart,
        type          : "datebox",
      },
      {
        label         : "Created on or before",
        data          : filter.dateModifiedEnd,
        changeHandler : filterChangeHandlers.setDateModifiedEnd,
        type          : "datebox",
      },
    ];

    return (
      <div>
        {/* Contextual Menu */}
        <ContentMenu
          className={styles.contextMenu}
          toggleSidebar={toggleSidebar}
          actionsMenu={actionsMenu}
          actions={this.actionsCollection}
          colSortItems={this.colSortItems.items}
          keys={rows.map(row => row.id)}
          sortKey={sortKey}
          selectAllRows={selectAllRows}
          clearRowSelection={clearRowSelection}
          addNewWorkbook={this.props.addNewWorkbook}
        />

        <div>
          {/* Search Container */}
          {
            actionsMenu.showSidebar &&
            <Search
              className={styles.search}
              config={searchConfig}
            />
          }

          {/* DataGrid Container */}
          <DG
            className={styles.datagrid}
            style={{ left: !actionsMenu.showSidebar && 0 }}
            isLoading={workbooks.isLoading}
            cols={this.colSpec}
            colWidths={this.colWidths}
            rows={rows}
            colSortFunction={sortColumn}
            sortKey={filter.sortKey}
            sortAscending={filter.sortAscending}
            onRowClick={toggleRow}
            selectedKeys={actionsMenu.selectedKeys}
          />
        </div>
      </div>
    );
  }

  render() {
    const { rollUp } = this.props;

    // ListMenu Container
    return (
      <div
        className={styles.base}
        style={{ top: rollUp ? 62 : 0 }}
      >

        {/* Breadcrumb */}
        <Breadcrumb
          className={styles.breadcrumb}
        />

        {/* Children content of the route */}
        {this.renderChildren()}

      </div>
    );
  }
}

Workbooks.propTypes = {
  rollUp   : React.PropTypes.bool.isRequired,
  children : React.PropTypes.node,

  // Store
  actionsMenu : React.PropTypes.object.isRequired,
  workbooks   : React.PropTypes.object.isRequired,
  filter      : React.PropTypes.object.isRequired,
  rows        : React.PropTypes.array.isRequired,

  // Actions
  toggleSidebar        : React.PropTypes.func,
  clearMenu            : React.PropTypes.func,
  selectAllRows        : React.PropTypes.func,
  clearRowSelection    : React.PropTypes.func,
  toggleRow            : React.PropTypes.func,
  sortColumn           : React.PropTypes.func,
  clearFilter          : React.PropTypes.func,
  loadWorkbooks        : React.PropTypes.func,
  addNewWorkbook       : React.PropTypes.func,
  deleteWorkbook       : React.PropTypes.func,
  filterChangeHandlers : React.PropTypes.shape({
    setWorkbookName      : React.PropTypes.func,
    setCreatedBy         : React.PropTypes.func,
    setDateModifiedStart : React.PropTypes.func,
    setDateModifiedEnd   : React.PropTypes.func,
  }),
};

const filterBindings = {
  textFilter : "name",
  dateFilter : "createdAt",
};

const mapStateToProps = (state) => ({
  actionsMenu : state.menu,
  workbooks   : state.workbooks,
  filter      : state.filter,
  rows        : getRows(state.workbooks.data, state.filter, filterBindings),
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar        : () => dispatch(cmActions.toggleMenuSidebar()),
  clearMenu            : () => dispatch(cmActions.clearMenuState()),
  selectAllRows        : (keys) => dispatch(cmActions.selectAll(keys)),
  clearRowSelection    : () => dispatch(cmActions.clearSelection()),
  toggleRow            : (index) => dispatch(cmActions.toggleSelection(index)),
  sortColumn           : (sortKey, sortOrder) => dispatch(filterActions.sortFilter(sortKey, sortOrder)),
  clearFilter          : () => dispatch(filterActions.clearFilterState()),
  loadWorkbooks        : () => dispatch(loadWorkbooks()),
  addNewWorkbook       : params => dispatch(addNewWorkbook(params)),
  deleteWorkbook       : params => dispatch(deleteWorkbook(params)),
  filterChangeHandlers : {
    setWorkbookName      : (e) => dispatch(filterActions.setWorkbookName(e)),
    setDateModifiedStart : (e) => dispatch(filterActions.setDateModifiedStart(e)),
    setDateModifiedEnd   : (e) => dispatch(filterActions.setDateModifiedEnd(e)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Workbooks);
