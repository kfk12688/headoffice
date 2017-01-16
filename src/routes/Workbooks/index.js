import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { DataGrid, SearchBar } from "components";
import { ContentMenu } from "./ContentMenu";
import { getSelectedKeys, exec } from "utils";
import {
  getWorkbooks, createWorkbook, deleteWorkbook, selectAll, deselectAll, toggleSelection
} from "dataflow/workbooks/actions";

class Workbooks extends Component {
  constructor(props) {
    super(props);

    this.actions   = {
      deleteWorkbook : {
        name    : "Delete Workbook",
        handler : exec(props.deleteWorkbook),
      },
    };
    this.colSpec   = [
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
        actions    : this.actions,
        text       : "Display Name",
        link       : {
          absolutePath : "user/workbook",
          key          : "id",
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

    if (!props.children) props.getWorkbooks();
  }

  renderChildren() {
    if (this.props.children) return this.props.children;

    const { data, isLoading } = this.props.list || { data : {}, isLoading : true };
    const selectedKeys        = getSelectedKeys(data);
    const searchConfig        = [
      {
        label : "WorkBook",
        type  : "searchbox",
      },
      {
        label : "Created by User",
        type  : "searchbox",
      },
      {
        label : "Created on or after",
        type  : "datebox",
      },
      {
        label : "Created on or before",
        type  : "datebox",
      },
    ];
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <ContentMenu actions={this.actions}
                       selectedKeys={selectedKeys}
                       createWorkbook={this.props.createWorkbook}
                       selectAllRows={this.props.selectAll}
                       deselectAllRows={this.props.deselectAll}
          />

          <StickyContainer>
            <div className="row">
              <div className="col-md-3">
                <Sticky><SearchBar config={searchConfig}/></Sticky>
              </div>

              <div className={"col-md-9"}>
                <DataGrid rows={data}
                          cols={this.colSpec}
                          isLoading={isLoading}
                          colWidths={this.colWidths}
                          onRowClick={this.props.toggleSelection}
                />
              </div>
            </div>
          </StickyContainer>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderChildren()}
      </div>
    );
  }
}

Workbooks.propTypes      = {
  children        : React.PropTypes.node,
  // Store
  list            : React.PropTypes.object.isRequired,
  // Actions
  getWorkbooks    : React.PropTypes.func,
  createWorkbook  : React.PropTypes.func,
  deleteWorkbook  : React.PropTypes.func,
  toggleSelection : React.PropTypes.func.required,
  selectAll       : React.PropTypes.func.required,
  deselectAll     : React.PropTypes.func.required,
};
const mapStateToProps    = (state) => ({
  list : state.workbooks.list,
});
const mapDispatchToProps = (dispatch) => ({
  getWorkbooks    : () => dispatch(getWorkbooks()),
  createWorkbook  : data => dispatch(createWorkbook(data)),
  deleteWorkbook  : name => dispatch(deleteWorkbook(name)),
  selectAll       : () => dispatch(selectAll()),
  deselectAll     : () => dispatch(deselectAll()),
  toggleSelection : (index) => dispatch(toggleSelection(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workbooks);
