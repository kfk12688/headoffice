import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import {
  getTemplates, deleteTemplate, createTemplate, starTemplate, selectAll, deselectAll, toggleSelection
} from "dataflow/templates/actions";
import { SearchBar, DataGrid } from "components";
import { toDate, exec, getSelectedKeys, getProps } from "utils";
import { ContentMenu } from "./ContentMenu";

const getValues = getProps(["data", "isLoading"]);

class Template extends Component {
  constructor(props) {
    super(props);

    this.actions      = {
      deleteTemplate : {
        name    : "Delete Template",
        handler : exec(props.deleteTemplate),
      },
    };
    this.searchConfig = [
      {
        label : "Owner",
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
      {
        label : "Show starred only",
        type  : "checkbox",
      },
      {
        label : "Recents only",
        type  : "checkbox",
      },
    ];
    this.colSpec      = [
      {
        dataKey     : "isSelected",
        headerStyle : { borderRight : 0 },
        name        : "checkbox-col",
        renderType  : "checkbox",
        sortable    : false,
        text        : "",
      },
      {
        dataKey     : "isFavorite",
        headerStyle : { borderRight : 0 },
        name        : "favorite-col",
        renderType  : "favorite",
        action      : props.starTemplate,
        sortable    : false,
        text        : "",
      },
      {
        dataKey    : "templateName",
        link       : {
          absolutePath : "templates",
          key          : "collectionName",
        },
        name       : "name-col",
        renderType : "link",
        text       : "Name",
        actions    : this.actions,
      },
      {
        dataKey    : "createdBy.username",
        name       : "user-col",
        renderType : "text",
        text       : "Created By",
      },
      {
        dataKey    : "workbook.name",
        name       : "workbook-col",
        renderType : "text",
        text       : "Work Book",
      },
      {
        dataKey    : "createdAt",
        name       : "created-at-col",
        renderType : "date",
        sortable   : true,
        text       : "Created On",
      },
      {
        cellFormatter : toDate("DD-MM-YY h:mm A"),
        dataKey       : "modifiedAt",
        name          : "updated-at-col",
        renderType    : "date",
        sortable      : true,
        text          : "Updated At",
      },
    ];
    this.colWidths    = {
      "checkbox-col"   : 38,
      "favorite-col"   : 38,
      "name-col"       : 230,
      "user-col"       : 120,
      "workbook-col"   : 180,
      "created-at-col" : 120,
      "updated-at-col" : 180,
    };

    if (!props.children) props.getTemplates();
  }

  renderChildren() {
    if (this.props.children) return this.props.children;

    const values       = getValues(this.props.templates);
    const selectedKeys = getSelectedKeys(values.data);
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <ContentMenu actions={this.actions}
                       selectedKeys={selectedKeys}
                       createTemplate={this.props.createTemplate}
                       selectAllRows={this.props.selectAllRows}
                       deselectAllRows={this.props.deselectAllRows}
          />

          <StickyContainer>
            <div className="row">
              <div className="col-md-3">
                <Sticky topOffset={-15}>
                  <SearchBar config={this.searchConfig}/>
                </Sticky>
              </div>

              <div className="col-md-9">
                <DataGrid rows={values.data}
                          cols={this.colSpec}
                          isLoading={values.isLoading}
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

Template.propTypes       = {
  children        : React.PropTypes.node,
  // Store
  templates       : React.PropTypes.object.isRequired,
  // Action types for Data Store
  getTemplates    : React.PropTypes.func.isRequired,
  deleteTemplate  : React.PropTypes.func.isRequired,
  createTemplate  : React.PropTypes.func.isRequired,
  starTemplate    : React.PropTypes.func.isRequired,
  // Menu Bar actions
  toggleSelection : React.PropTypes.func.isRequired,
  selectAllRows   : React.PropTypes.func.isRequired,
  deselectAllRows : React.PropTypes.func.isRequired,
};
const mapStateToProps    = (state) => ({
  templates : state.templates.list,
});
const mapDispatchToProps = (dispatch) => ({
  getTemplates    : () => dispatch(getTemplates()),
  deleteTemplate  : (key) => dispatch(deleteTemplate(key)),
  createTemplate  : (params) => dispatch(createTemplate(params)),
  starTemplate    : (key) => dispatch(starTemplate(key)),
  // menubar actions
  toggleSelection : (key) => dispatch(toggleSelection(key)),
  selectAllRows   : () => dispatch(selectAll()),
  deselectAllRows : () => dispatch(deselectAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);
