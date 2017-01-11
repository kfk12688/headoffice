import R from "ramda";
import React, { Component } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { connect } from "react-redux";
import { toggleSelection, getTemplates, deleteTemplate, createTemplate } from "dataflow/templates/actions";
import { SearchBar, DataGrid } from "components";
import { ContentMenu } from "./ContentMenu";
import { Formatter as formatter } from "../_utils";
import cx from "classnames";

const exec = R.curry((delFn, name) => delFn(name));

class Template extends Component {
  constructor(props) {
    super(props);
    const actions = {
      deleteTemplate : () => {
        const { menuStore: { selectedKeys } } = this.props;
        const del                             = exec(this.props.deleteTemplate);
        if (selectedKeys.length > 1) {
          R.map(del, selectedKeys);
        } else {
          del(selectedKeys[0]);
        }
      },
    };

    this.actionsCollection = [
      { name : "Delete Template", handler : actions.deleteTemplate },
    ];
    this.searchConfig      = [
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
    this.colSpec           = [
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
        sortable    : false,
        text        : "",
      },
      {
        dataKey    : "templateName",
        linkRef    : {
          path   : "templates",
          urlKey : "collectionName",
        },
        name       : "name-col",
        renderType : "link",
        text       : "Name",
        actions    : this.actionsCollection,
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
        cellFormatter : formatter.toDate.bind(undefined, "DD-MM-YY h:mm A"),
        dataKey       : "modifiedAt",
        name          : "updated-at-col",
        renderType    : "date",
        sortable      : true,
        text          : "Updated At",
      },
    ];
    this.colWidths         = {
      "checkbox-col"   : 38,
      "favorite-col"   : 38,
      "name-col"       : 230,
      "user-col"       : 120,
      "workbook-col"   : 170,
      "created-at-col" : 150,
      "updated-at-col" : 150,
    };
  }

  componentWillMount() {
    this.props.getTemplates();
  }

  renderChildren() {
    if (this.props.children) return this.props.children;

    const { menuStore } = this.props;
    const { data        = {}, isLoading } = this.props.list || {};
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <ContentMenu
            dataKeys={Object.keys(data)}
            actions={this.actionsCollection}
            createTemplate={this.props.createTemplate}
          />

          <StickyContainer>
            <div className="row">
              {
                menuStore.showSidebar &&
                <div className="col-md-3">
                  <Sticky topOffset={-15}>
                    <SearchBar config={this.searchConfig}/>
                  </Sticky>
                </div>
              }

              <div className={cx({ "col-md-9" : menuStore.showSidebar, "col-md-12" : !menuStore.showSidebar })}>
                <DataGrid
                  isLoading={isLoading}
                  cols={this.colSpec}
                  colWidths={this.colWidths}
                  rows={data}
                  onRowClick={this.props.toggleSelection}
                  selectedKeys={menuStore.selectedKeys}
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

Template.propTypes = {
  children        : React.PropTypes.node,
  // Store
  list            : React.PropTypes.object.isRequired,
  menuStore       : React.PropTypes.object.isRequired,
  filterStore     : React.PropTypes.object.isRequired,
  // Action types for Menu Store
  toggleSelection : React.PropTypes.func.isRequired,
  // Action types for Data Store
  getTemplates    : React.PropTypes.func.isRequired,
  deleteTemplate  : React.PropTypes.func.isRequired,
  createTemplate  : React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  list        : state.templates.list,
  menuStore   : state.menu,
  filterStore : state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSelection : (index) => dispatch(toggleSelection(index)),
  getTemplates    : (params) => dispatch(getTemplates(params)),
  deleteTemplate  : (params) => dispatch(deleteTemplate(params)),
  createTemplate  : (params) => dispatch(createTemplate(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Template);
