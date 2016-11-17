import React, { Component } from "react";
import { connect } from "react-redux";
import { DataGrid, Breadcrumb, SearchBar, StickySidebar } from "components";
import { ContentMenu } from "./ContentMenu";
import { toggleSelection } from "dataflow/menu/actions";
import { setDateModifiedEnd, setDateModifiedStart, setWorkbookName } from "dataflow/filter/actions";
import { getWorkbooks, createWorkbook, deleteWorkbook } from "dataflow/workbooks/actions";
import cx from "classnames";

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
        dataKey     : "isSelected",
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
          path   : "user/workbook",
          urlKey : "id",
        },
      },
      {
        dataKey    : "createdBy.username",
        name       : "full-name-col",
        renderType : "text",
        text       : "Created By",
      },
      {
        dataKey    : "createdAt",
        name       : "created-at-col",
        renderType : "date",
        sortable   : true,
        text       : "Created On",
      },
    ];
    this.colWidths = {
      "has-alert-col"  : 38,
      "name-col"       : 260,
      "full-name-col"  : 200,
      "created-at-col" : 160,
    };
  }

  componentWillMount() {
    this.props.getWorkbooks();
  }

  getActions() {
    const _deleteWorkbook = () => {
      const { menuStore: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        this.props.deleteWorkbook({ id : selectedKeys });
      } else {
        this.props.deleteWorkbook({ id : selectedKeys[0] });
      }
    };

    return {
      deleteWorkbook : _deleteWorkbook,
    };
  }

  renderChildren() {
    if (this.props.children) return this.props.children;

    const { filterStore, menuStore, filterChangeHandlers, toggleRow } = this.props;
    const { data = {}, isLoading } = this.props.workbooks;
    const searchConfig = [
      {
        label         : "WorkBook",
        data          : filterStore.workbook,
        changeHandler : filterChangeHandlers.setWorkbookName,
        type          : "searchbox",
      },
      {
        label         : "Created by User",
        data          : filterStore.createdBy,
        changeHandler : filterChangeHandlers.setCreatedBy,
        type          : "searchbox",
      },
      {
        label         : "Created on or after",
        data          : filterStore.dateModifiedStart,
        changeHandler : filterChangeHandlers.setDateModifiedStart,
        type          : "datebox",
      },
      {
        label         : "Created on or before",
        data          : filterStore.dateModifiedEnd,
        changeHandler : filterChangeHandlers.setDateModifiedEnd,
        type          : "datebox",
      },
    ];

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <ContentMenu
            dataKeys={Object.keys(data)}
            actions={this.actionsCollection}
            addNewWorkbook={this.props.createWorkbook}
          />

          <div className="row">
            {
              menuStore.showSidebar &&
              <div className="col-md-3">
                <StickySidebar top={113} width={236}>
                  <SearchBar config={searchConfig}/>
                </StickySidebar>
              </div>
            }

            <div className={cx({ "col-md-9" : menuStore.showSidebar, "col-md-12" : !menuStore.showSidebar })}>
              <DataGrid
                style={{ left : !menuStore.showSidebar && 0 }}
                isLoading={isLoading}
                rows={data}
                cols={this.colSpec}
                colWidths={this.colWidths}
                selectedKeys={menuStore.selectedKeys}
                onRowClick={toggleRow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Breadcrumb className="col-md-10 offset-md-1"/>
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}

Workbooks.propTypes = {
  children : React.PropTypes.node,

  // Store
  menuStore   : React.PropTypes.object.isRequired,
  workbooks   : React.PropTypes.object.isRequired,
  filterStore : React.PropTypes.object.isRequired,

  // Actions
  toggleRow            : React.PropTypes.func,
  getWorkbooks         : React.PropTypes.func,
  createWorkbook       : React.PropTypes.func,
  deleteWorkbook       : React.PropTypes.func,
  filterChangeHandlers : React.PropTypes.shape({
    setWorkbookName      : React.PropTypes.func,
    setDateModifiedStart : React.PropTypes.func,
    setDateModifiedEnd   : React.PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  menuStore   : state.menu,
  workbooks   : state.workbooks.list,
  filterStore : state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  toggleRow            : (index) => dispatch(toggleSelection(index)),
  getWorkbooks         : () => dispatch(getWorkbooks()),
  createWorkbook       : data => dispatch(createWorkbook(data)),
  deleteWorkbook       : name => dispatch(deleteWorkbook(name)),
  filterChangeHandlers : {
    setWorkbookName      : (e) => dispatch(setWorkbookName(e)),
    setDateModifiedStart : (e) => dispatch(setDateModifiedStart(e)),
    setDateModifiedEnd   : (e) => dispatch(setDateModifiedEnd(e)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Workbooks);
