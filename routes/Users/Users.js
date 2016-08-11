import React, { Component } from "react";
import { connect } from "react-redux";
import { DG, Breadcrumb, Search } from "components";
import { ContentMenu } from "./ContentMenu";
import * as userActions from "../../dataflow/user/actions";
import * as cmActions from "../../dataflow/menu/actions";
import * as filterActions from "../../dataflow/filter/actions";
import { getRows } from "../utils";
import styles from "./Users.less";

class User extends Component {
  constructor(props) {
    super(props);
    this.getActions = this.getActions.bind(this);
    const actions = this.getActions();
    this.actionsCollection = [
      { name : "Delete User", handler : actions.deleteUser },
      { name : "XXXify User", handler : actions.deleteUser },
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
        text       : "Display Name",
        actions    : this.actionsCollection,
        linkRef    : {
          path   : "/user/edit",
          urlKey : "id",
        },
      },
      {
        dataKey    : "phoneNumber",
        name       : "phone-number-col",
        text       : "Phone Number",
        renderType : "text",
      },
    ];
    this.colWidths = {
      "has-alert-col"    : 38,
      "name-col"         : 160,
      "phone-number-col" : 160,
    };

    this.colSortItems = this.getColumnSortList(props.sortColumn);
  }

  componentWillMount() {
    this.props.loadUser();
  }

  componentWillReceiveProps(nextProps) {
    const userData = Object.keys(this.props.user.data);
    const nextUserData = Object.keys(nextProps.user.data);

    if (nextUserData.length !== userData.length) {
      this.props.loadUser();
    }
  }

  getActions() {
    const _deleteUser = () => {
      const { deleteUser, actionsMenu: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        deleteUser({ id : selectedKeys });
      } else {
        deleteUser({ id : selectedKeys[0] });
      }
    };

    return {
      deleteUser : _deleteUser,
    };
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

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }

    const {
      user, filter, actionsMenu, rows, toggleSidebar, selectAllRows, clearRowSelection, filterChangeHandlers,
      sortColumn, toggleRow, addNewUser,
    } = this.props;

    const sortOrderIndex = filter.sortAscending ? 0 : 1;
    const sortKey = filter.sortKey ? this.colSortItems.displayText[filter.sortKey][sortOrderIndex] : null;

    const searchConfig = [
      {
        label         : "User",
        data          : filter.username,
        changeHandler : filterChangeHandlers.setFilterUsername,
        type          : "searchbox",
      },
      {
        label         : "Has role",
        data          : filter.hasRole,
        changeHandler : filterChangeHandlers.setFilterHasRole,
        type          : "searchbox",
      },
      {
        label         : "Last login on or after",
        data          : filter.lastSignIn,
        changeHandler : filterChangeHandlers.setFilterLastSignIn,
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
          addNewUser={addNewUser}
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
            isLoading={user.isLoading}
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

User.propTypes = {
  rollUp   : React.PropTypes.bool,
  children : React.PropTypes.node,

  // Store
  actionsMenu : React.PropTypes.object.isRequired,
  user        : React.PropTypes.object.isRequired,
  filter      : React.PropTypes.object.isRequired,
  rows        : React.PropTypes.array.isRequired,

  // Actions
  toggleSidebar        : React.PropTypes.func.isRequired,
  clearMenu            : React.PropTypes.func.isRequired,
  selectAllRows        : React.PropTypes.func.isRequired,
  clearRowSelection    : React.PropTypes.func.isRequired,
  toggleRow            : React.PropTypes.func.isRequired,
  sortColumn           : React.PropTypes.func.isRequired,
  clearFilter          : React.PropTypes.func.isRequired,
  loadUser             : React.PropTypes.func.isRequired,
  addNewUser           : React.PropTypes.func.isRequired,
  deleteUser           : React.PropTypes.func.isRequired,
  filterChangeHandlers : React.PropTypes.shape({
    setFilterUsername   : React.PropTypes.func.isRequired,
    setFilterHasRole    : React.PropTypes.func.isRequired,
    setFilterLastSignIn : React.PropTypes.func.isRequired,
  }),
};

const filterBindings = {
  textFilter : ["username", "hasRole"],
  dateFilter : "lastSignIn",
};

const mapStateToProps = (state) => ({
  actionsMenu : state.menu,
  user        : state.user,
  filter      : state.filter,
  rows        : getRows(state.user.data, state.filter, filterBindings),
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar        : () => dispatch(cmActions.toggleMenuSidebar()),
  clearMenu            : () => dispatch(cmActions.clearMenuState()),
  selectAllRows        : (keys) => dispatch(cmActions.selectAll(keys)),
  clearRowSelection    : () => dispatch(cmActions.clearSelection()),
  toggleRow            : (index) => dispatch(cmActions.toggleSelection(index)),
  sortColumn           : (sortKey, sortOrder) => dispatch(filterActions.sortFilter(sortKey, sortOrder)),
  clearFilter          : () => dispatch(filterActions.clearFilterState()),
  loadUser             : (params) => dispatch(userActions.loadUser(params)),
  addNewUser           : (params) => dispatch(userActions.addNewUser(params)),
  deleteUser           : (params) => dispatch(userActions.deleteUser(params)),
  filterChangeHandlers : {
    setFilterUsername   : (e) => dispatch(filterActions.setUserName(e)),
    setFilterHasRole    : (e) => dispatch(filterActions.setUserHasRole(e)),
    setFilterLastSignIn : (e) => dispatch(filterActions.setLastSignIn(e)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
