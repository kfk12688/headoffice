import React, { Component } from "react";
import { connect } from "react-redux";
import { DG, Breadcrumb, ContentMenu, Search } from "components";
import * as userActions from "../../dataflow/user/actions";
import * as cmActions from "../../dataflow/menu/actions";
import * as filterActions from "../../dataflow/filter/actions";
import { Formatter as formatter, getRows } from "../utils";
import styles from "../Content/Content.less";

class User extends Component {
  constructor(props) {
    super(props);
    this.colSpec = [
      {
        headerStyle : { borderRight : 0 },
        name        : "has-alert-col",
        renderType  : "checkbox",
        sortable    : false,
        text        : "",
      },
      {
        dataKey    : "displayName",
        name       : "display-name-col",
        renderType : "link",
        text       : "Display Name",
        linkRef    : {
          path   : "/users",
          urlKey : "username",
        },
      },
      {
        dataKey : "username",
        name    : "user-name-col",
        text    : "User Name",
      },
      {
        dataKey : "siteRole",
        name    : "site-role-col",
        text    : "Site Role",
      },
      {
        dataKey    : "groupCount",
        name       : "groups-count-col",
        renderType : "number",
        text       : "Groups",
      },
      {
        cellFormatter : formatter.toDate,
        dataKey       : "lastSignIn",
        name          : "last-signin-col",
        renderType    : "date",
        sortable      : true,
        text          : "Last Signed In",
      },
    ];
    this.colWidths = {
      "has-alert-col"    : 38,
      "display-name-col" : 160,
      "user-name-col"    : 160,
      "site-role-col"    : 140,
      "groups-count-col" : 80,
      "last-signin-col"  : 150,
    };
    this.colSortItems = this.getColumnSortList(props.sortColumn);
  }

  componentWillMount() {
    this.props.clearFilter();
    this.props.clearMenu();
    this.props.loadUserList();
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

  render() {
    const { user, filter, actionsMenu, rows } = this.props;
    const sortOrderIndex = filter.sortAscending ? 0 : 1;
    const sortKey = filter.sortKey ? this.colSortItems.displayText[filter.sortKey][sortOrderIndex] : null;

    const {
      rollUp,
      toggleSidebar,
      selectAllRows,
      clearRowSelection,
      filterChangeHandlers,
      sortColumn,
      toggleRow,
    } = this.props;

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

        {/* Contextual Menu */}
        <ContentMenu
          className={styles.contextMenu}
          toggleSidebar={toggleSidebar}
          actionsMenu={actionsMenu}
          countItems={user.selectedKeys.length}
          colSortItems={this.colSortItems.items}
          sortKey={sortKey}
          selectAllRows={selectAllRows}
          clearRowSelection={clearRowSelection}
        />

        <div>
          {/* Search Container */}
          {
            actionsMenu.showSidebar &&
            <Search
              className={styles.search}
              filterData={filter}
              changeHandlers={filterChangeHandlers}
            />
          }

          {/* DataGrid Container */}
          <DG
            className={styles.datagrid}
            style={{ left: !actionsMenu.showSidebar && 0 }}
            isLoading={user.isLoading}
            cols={this.colSpec}
            colWidths={this.colWidths}
            rows={rows}
            colSortFunction={sortColumn}
            sortKey={filter.sortKey}
            sortAscending={filter.sortAscending}
            onRowClick={toggleRow}
            selectedKeys={user.selectedKeys}
          />
        </div>
      </div>
    );
  }
}

const filterBindings = {
  dateFilter     : "lastSignIn",
  recentFilter   : "lastSignIn",
  favoriteFilter : "isFavorite",
};

const mapStateToProps = (state) => ({
  actionsMenu : state.menu,
  user        : state.user,
  filter      : state.filter,
  rows        : getRows(state.user.data, state.filter, filterBindings),
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar        : () => dispatch(cmActions.toggleMenuSidebar()),
  selectAllRows        : () => dispatch(userActions.selectAllUser()),
  clearRowSelection    : () => dispatch(userActions.clearUserSelection()),
  sortColumn           : (sortKey, sortOrder) => dispatch(filterActions.sortFilter(sortKey, sortOrder)),
  toggleRow            : (index) => dispatch(userActions.toggleUser(index)),
  loadUserList         : (params) => dispatch(userActions.loadUser(params)),
  clearFilter          : () => dispatch(filterActions.clearFilterState()),
  clearMenu            : () => dispatch(cmActions.clearMenuState()),
  filterChangeHandlers : {
    setDateModifiedStart : (e) => dispatch(filterActions.setFilterDtModStart(e)),
    setDateModifiedEnd   : (e) => dispatch(filterActions.setFilterDtModEnd(e)),
    setOwner             : (e) => dispatch(filterActions.setFilterOwner(e)),
    setIsRecent          : (e) => dispatch(filterActions.setFilterIsRecent(e)),
    setIsStarred         : (e) => dispatch(filterActions.setFilterIsStarred(e)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
