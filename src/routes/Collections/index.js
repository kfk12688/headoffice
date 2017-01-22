import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { SearchBar, DataGrid } from "components";
import { getProps, toDate, exec, getSelectedKeys } from "utils";
import { toggleSelection, getTemplates, starCollection, selectAll, deselectAll } from "dataflow/collections/actions";
import { ContentMenu } from "./ContentMenu";

const getValues = getProps(["data", "isLoading"]);

class Collections extends Component {
  constructor(props) {
    super(props);
    this.actions   = [];
    this.colSpec   = [
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
        action      : exec(props.starCollection),
        sortable    : false,
        text        : "",
      },
      {
        dataKey    : "templateName",
        link       : {
          absolutePath : "collections/view",
          key          : "collectionName",
        },
        buttonLink : {
          text         : "Enter Data",
          absolutePath : "collections/entry",
          key          : "collectionName",
        },
        name       : "name-col",
        renderType : "buttonLikeLink",
        text       : "Name",
        "actions"  : this.actions,
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
    this.colWidths = {
      "checkbox-col"   : 38,
      "favorite-col"   : 38,
      "name-col"       : 270,
      "workbook-col"   : 220,
      "created-at-col" : 120,
      "updated-at-col" : 150,
    };

    if (!props.children) props.getTemplates();
  }

  renderChildren() {
    if (this.props.children) return this.props.children;

    const values       = getValues(this.props.collections);
    const selectedKeys = getSelectedKeys(values.data);
    const searchConfig = [
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
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <ContentMenu actions={this.actions}
                       selectedKeys={selectedKeys}
                       selectAllRows={this.props.selectAllRows}
                       deselectAllRows={this.props.deselectAllRows}
          />

          <StickyContainer>
            <div className="row">
              <div className="col-md-3">
                <Sticky><SearchBar config={searchConfig}/></Sticky>
              </div>

              <div className={"col-md-9"}>
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

Collections.propTypes    = {
  children        : React.PropTypes.node,
  // Store
  collections     : React.PropTypes.object.isRequired,
  // Action types for Menu Store
  toggleSelection : React.PropTypes.func.isRequired,
  // Action types for Data Store
  getTemplates    : React.PropTypes.func.isRequired,
  starCollection  : React.PropTypes.func.isRequired,
  selectAllRows   : React.PropTypes.func.isRequired,
  deselectAllRows : React.PropTypes.func.isRequired,
};
const mapStateToProps    = (state) => ({
  collections : state.collections.list,
});
const mapDispatchToProps = (dispatch) => ({
  getTemplates    : () => dispatch(getTemplates()),
  toggleSelection : (collectionName) => dispatch(toggleSelection(collectionName)),
  starCollection  : (collectionName) => dispatch(starCollection(collectionName)),
  selectAllRows   : () => dispatch(selectAll()),
  deselectAllRows : () => dispatch(deselectAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
