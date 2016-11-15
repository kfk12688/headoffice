import _ from "underscore";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setDateModifiedStart, setDateModifiedEnd, setIsRecent, setIsStarred, setOwner } from "dataflow/filter/actions";
import { toggleSelection } from "dataflow/menu/actions";
import { loadTemplate, deleteTemplate, addTemplate, makeFavorite } from "dataflow/template/list/actions";
import { Breadcrumb, SearchBar, DataGrid, StickySidebar } from "components";
import { ContentMenu } from "./ContentMenu";
import { Formatter as formatter } from "../_utils";
import cx from "classnames";
import { grey50 } from "../_styles/colors";

class Template extends Component {
  constructor(props) {
    super(props);
    this.getActions = this.getActions.bind(this);
    const actions = this.getActions();
    // fixme
    this.actionsCollection = [
      { name : "Delete Template", handler : actions.deleteTemplate },
      { name : "Mark favorite", handler : actions.makeFavorite },
      { name : "Un Favorite", handler : actions.unFavorite },
    ];

    // Defines the static colum specification for the Template Area
    this.colSpec = [
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
          path   : "template",
          urlKey : "id",
        },
        name       : "name-col",
        renderType : "link",
        text       : "Name",
        "actions"  : this.actionsCollection,
      },
      {
        dataKey    : "createdBy.username",
        name       : "user-col",
        renderType : "text",
        text       : "Created By",
      },
      {
        dataKey    : "workBook.name",
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
    this.colWidths = {
      "checkbox-col"   : 38,
      "favorite-col"   : 38,
      "name-col"       : 230,
      "user-col"       : 120,
      "workbook-col"   : 170,
      "created-at-col" : 150,
      "updated-at-col" : 150,
    };

    this.colSortItems = this.getColumnSortList();
  }

  componentWillMount() {
    this.props.loadTemplate();
  }

  getActions() {
    const _deleteTemplate = () => {
      const { menuStore: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        const objs = selectedKeys.map(key => ({ id : key }));
        this.props.deleteTemplate(objs);
      } else {
        this.props.deleteTemplate({ id : selectedKeys[0] });
      }
    };
    const _makeFavorite = () => {
      const { menuStore: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        const objs = selectedKeys.map(key => ({ id : key, isFavorite : true }));
        this.props.makeFavorite(objs);
      } else {
        this.props.makeFavorite({ id : selectedKeys[0], isFavorite : true });
      }
    };
    const _unFavorite = () => {
      const { menuStore: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        const objs = selectedKeys.map(key => ({ id : key, isFavorite : false }));
        this.props.makeFavorite(objs);
      } else {
        this.props.makeFavorite({ id : selectedKeys[0], isFavorite : false });
      }
    };

    return {
      deleteTemplate : _deleteTemplate,
      makeFavorite   : _makeFavorite,
      unFavorite     : _unFavorite,
    };
  }

  getColumnSortList() {
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

    _.forEach(cols, (col, key) => {
      const isColSortable = (col.sortable === undefined) || col.sortable;

      if (isColSortable) {
        const colRenderType = (col.renderType === undefined) ? "text" : col.renderType;
        displayText[col.dataKey] = {};
        for (let i = 0; i < 2; i++) {
          const name = `${col.text} (${sortOrders[i][colRenderType]})`;
          items.push(<div key={`${key}${i}`}>{name}</div>);
          displayText[col.dataKey][i] = name;
        }
      }
    });

    return {
      items,
      displayText,
    };
  }

  renderChildren() {
    if (this.props.children) return this.props.children;

    const { list, filterChangeHandlers, filterStore, menuStore } = this.props;
    const searchConfig = [
      {
        label         : "Owner",
        data          : filterStore.owner,
        changeHandler : filterChangeHandlers.setOwner,
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
      {
        label         : "Show starred only",
        data          : filterStore.isStarred,
        changeHandler : filterChangeHandlers.setIsStarred,
        type          : "checkbox",
      },
      {
        label         : "Recents only",
        data          : filterStore.isRecent,
        changeHandler : filterChangeHandlers.setIsRecent,
        type          : "checkbox",
      },
    ];

    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <ContentMenu
            dataKeys={Object.keys(list.data)}
            actions={this.actionsCollection}
            addTemplate={this.props.addTemplate}
          />

          <div className="row">
            {
              menuStore.showSidebar &&
              <div className="col-md-3">
                <StickySidebar top={113}>
                  <SearchBar config={searchConfig}/>
                </StickySidebar>
              </div>
            }

            <div className={cx({ "col-md-9" : menuStore.showSidebar, "col-md-12" : !menuStore.showSidebar })}>
              <DataGrid
                isLoading={list.isLoading}
                cols={this.colSpec}
                colWidths={this.colWidths}
                rows={list.data}
                sortKey={filterStore.sortKey}
                sortAscending={filterStore.sortAscending}
                onRowClick={this.props.toggleSelection}
                selectedKeys={menuStore.selectedKeys}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { rollUp } = this.props;

    const container = {
      backgroundColor : grey50,
    };

    return (
      <div className={cx("container-fluid")}
           style={{ top : rollUp ? 35 : 0, ...container }}
      >
        <div className="row">
          <Breadcrumb className="col-md-10 offset-md-1"/>
        </div>

        {this.renderChildren()}
      </div>
    );
  }
}

Template.propTypes = {
  rollUp   : React.PropTypes.bool,
  children : React.PropTypes.node,

  // Store
  list        : React.PropTypes.object.isRequired,
  menuStore   : React.PropTypes.object.isRequired,
  filterStore : React.PropTypes.object.isRequired,

  // Action types for Menu Store
  toggleSelection : React.PropTypes.func.isRequired,

  // Action types for Data Store
  loadTemplate   : React.PropTypes.func.isRequired,
  deleteTemplate : React.PropTypes.func.isRequired,
  addTemplate    : React.PropTypes.func.isRequired,
  makeFavorite   : React.PropTypes.func.isRequired,

  // Action types for Filter Store
  filterChangeHandlers : React.PropTypes.shape({
    setDateModifiedStart : React.PropTypes.func.isRequired,
    setDateModifiedEnd   : React.PropTypes.func.isRequired,
    setOwner             : React.PropTypes.func.isRequired,
    setIsRecent          : React.PropTypes.func.isRequired,
    setIsStarred         : React.PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  list        : state.template.list,
  menuStore   : state.menu,
  filterStore : state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSelection      : (index) => dispatch(toggleSelection(index)),
  loadTemplate         : (params) => dispatch(loadTemplate(params)),
  deleteTemplate       : (params) => dispatch(deleteTemplate(params)),
  addTemplate          : (params) => dispatch(addTemplate(params)),
  makeFavorite         : (params) => dispatch(makeFavorite(params)),
  filterChangeHandlers : {
    setDateModifiedStart : (e) => dispatch(setDateModifiedStart(e)),
    setDateModifiedEnd   : (e) => dispatch(setDateModifiedEnd(e)),
    setOwner             : (e) => dispatch(setOwner(e)),
    setIsRecent          : (e) => dispatch(setIsRecent(e)),
    setIsStarred         : (e) => dispatch(setIsStarred(e)),
  },
});

export default
connect(mapStateToProps, mapDispatchToProps)(Template);
