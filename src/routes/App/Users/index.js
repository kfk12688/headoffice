import React, { Component } from "react";
import { connect } from "react-redux";
import { Breadcrumb, SearchBar, DataGrid } from "components";
import { loadUser, addNewUser, deleteUser } from "dataflow/user/actions";
import { toggleSelection } from "dataflow/menu/actions";
import { setUserName, setUserHasRole, setLastSignIn } from "dataflow/filter/actions";
import { ContentMenu } from "./ContentMenu";
import styles from "./index.less";

class User extends Component {
  constructor(props) {
    super(props);
    this.getActions = this.getActions.bind(this);
    const actions = this.getActions();
    this.actionsCollection = [
      { name : "Delete User", handler : actions.deleteUser },
      { name : "XXXify User", handler : actions.deleteUser },
    ];

    // Defines the static colum specification for the Template Area
    this.colSpec = [
      {
        dataKey     : "isSelected",
        headerStyle : { borderRight : 0 },
        name        : "has-alert-col",
        renderType  : "checkbox",
        sortable    : false,
        text        : "",
      },
      {
        dataKey    : "username",
        name       : "username-col",
        renderType : "link",
        text       : "Display Name",
        actions    : this.actionsCollection,
        linkRef    : {
          path   : "app/user",
          urlKey : "id",
        },
      },
      {
        dataKey    : ["firstName", "lastName"],
        name       : "full-name-col",
        renderType : "join",
        text       : "Full Name",
      },
      {
        dataKey    : "createdAt",
        name       : "created-at-col",
        renderType : "date",
        sortable   : true,
        text       : "Created On",
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
      "username-col"     : 160,
      "full-name-col"    : 200,
      "created-at-col"   : 120,
      "phone-number-col" : 160,
    };
  }

  componentWillMount() {
    this.props.loadUser();
  }

  componentWillReceiveProps(nextProps) {
    const userData = Object.keys(this.props.userStore.data);
    const nextUserData = Object.keys(nextProps.userStore.data);

    if (nextUserData.length !== userData.length) {
      this.props.loadUser();
    }
  }

  getActions() {
    const _deleteUser = () => {
      const { menuStore: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        this.props.deleteUser({ id : selectedKeys });
      } else {
        this.props.deleteUser({ id : selectedKeys[0] });
      }
    };

    return {
      deleteUser : _deleteUser,
    };
  }

  renderChildren() {
    if (this.props.children) return this.props.children;

    const { userStore, filterStore, menuStore, filterChangeHandlers, toggleRow } = this.props;
    const searchConfig = [
      {
        label         : "User",
        data          : filterStore.username,
        changeHandler : filterChangeHandlers.setFilterUsername,
        type          : "searchbox",
      },
      {
        label         : "Has role",
        data          : filterStore.hasRole,
        changeHandler : filterChangeHandlers.setFilterHasRole,
        type          : "searchbox",
      },
      {
        label         : "Last login on or after",
        data          : filterStore.lastSignIn,
        changeHandler : filterChangeHandlers.setFilterLastSignIn,
        type          : "datebox",
      },
    ];

    return (
      <div>
        {/* Contextual Menu */}
        <ContentMenu
          className={styles.contextMenu}
          actions={this.actionsCollection}
          dataKeys={Object.keys(userStore.data)}
          addNewUser={this.props.addNewUser}
        />

        <div>
          {/* SearchBar Container */}
          {
            menuStore.showSidebar &&
            <SearchBar
              className={styles.search}
              config={searchConfig}
            />
          }

          {/* DataGrid Container */}
          <DataGrid
            className={styles.datagrid}
            style={{ left : !menuStore.showSidebar && 0 }}
            isLoading={userStore.isLoading}
            cols={this.colSpec}
            colWidths={this.colWidths}
            rows={userStore.data}
            sortKey={filterStore.sortKey}
            sortAscending={filterStore.sortAscending}
            onRowClick={toggleRow}
            selectedKeys={menuStore.selectedKeys}
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
        style={{ top : rollUp ? 35 : 0 }}
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
  menuStore   : React.PropTypes.object.isRequired,
  userStore   : React.PropTypes.object.isRequired,
  filterStore : React.PropTypes.object.isRequired,

  // Actions
  toggleRow            : React.PropTypes.func.isRequired,
  loadUser             : React.PropTypes.func.isRequired,
  addNewUser           : React.PropTypes.func.isRequired,
  deleteUser           : React.PropTypes.func.isRequired,
  filterChangeHandlers : React.PropTypes.shape({
    setFilterUsername   : React.PropTypes.func.isRequired,
    setFilterHasRole    : React.PropTypes.func.isRequired,
    setFilterLastSignIn : React.PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  menuStore   : state.menu,
  userStore   : state.user,
  filterStore : state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  toggleRow            : (index) => dispatch(toggleSelection(index)),
  loadUser             : (params) => dispatch(loadUser(params)),
  addNewUser           : (params) => dispatch(addNewUser(params)),
  deleteUser           : (params) => dispatch(deleteUser(params)),
  filterChangeHandlers : {
    setFilterUsername   : (e) => dispatch(setUserName(e)),
    setFilterHasRole    : (e) => dispatch(setUserHasRole(e)),
    setFilterLastSignIn : (e) => dispatch(setLastSignIn(e)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
