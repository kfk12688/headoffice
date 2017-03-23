import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { SearchBar, DataGrid } from "components";
import { getProps, toDate, getSelectedKeys } from "utils";
import { getCollections, starCollection, deleteCollection, selectAll, deselectAll, toggleSelection } from "dataflow/collections/actions";
import { ContentMenu } from "./ContentMenu";

const getValues = getProps(["data", "isLoading"]);

class Collections extends Component {
  constructor(props) {
    super(props);
    this.actions   = {
      deleteCollection : {
        name    : "Delete Template",
        handler : props.deleteCollection,
      },
    };
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
        action      : props.starCollection,
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
          absolutePath : "collections/new",
          key          : "collectionName",
        },
        name       : "name-col",
        renderType : "buttonLikeLink",
        text       : "Name",
        "actions"  : this.actions,
      },
      {
        dataKey    : "workbook.workbookName",
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
      "workbook-col"   : 180,
      "created-at-col" : 120,
      "updated-at-col" : 180,
    };
  }

  componentWillMount() {
    this.props.getCollections();
  }

  renderChildren() {
    const values       = getValues(this.props.collectionsList);
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
        {(this.props.children) ? this.props.children : this.renderChildren()}
      </div>
    );
  }
}

Collections.propTypes    = {
  children         : React.PropTypes.node,
  // Store
  collectionsList  : React.PropTypes.object.isRequired,
  // Menu Actions
  toggleSelection  : React.PropTypes.func.isRequired,
  selectAllRows    : React.PropTypes.func.isRequired,
  deselectAllRows  : React.PropTypes.func.isRequired,
  // Collection Actions
  getCollections   : React.PropTypes.func.isRequired,
  starCollection   : React.PropTypes.func.isRequired,
  deleteCollection : React.PropTypes.func.isRequired,
};
const mapStateToProps    = (state) => ({
  collectionsList : state.collections.list,
});
const mapDispatchToProps = (dispatch) => ({
  // collection actions
  getCollections   : () => dispatch(getCollections()),
  starCollection   : (collectionName) => dispatch(starCollection(collectionName)),
  deleteCollection : (collectionName) => dispatch(deleteCollection(collectionName)),
  // menu actions
  toggleSelection  : (collectionName) => dispatch(toggleSelection(collectionName)),
  selectAllRows    : () => dispatch(selectAll()),
  deselectAllRows  : () => dispatch(deselectAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
