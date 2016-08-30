import React, { Component } from "react";
import _ from "underscore";
import { connect } from "react-redux";
import { Breadcrumb, SearchBar, DataGrid } from "components";
import { ContentMenu } from "./ContentMenu";
import * as filterActions from "../../dataflow/filter/actions";
import * as cmActions from "../../dataflow/menu/actions";
import * as contentActions from "../../dataflow/content/facing/actions";
import { getRows, Formatter as formatter } from "../utils";
import styles from "./Content.less";

class Content extends Component {
  constructor(props) {
    super(props);
    this.getActions = this.getActions.bind(this);
    const actions = this.getActions();
    this.actionsCollection = [
      { name : "Delete Template", handler : actions.deleteTemplate }, // fixme
    ];

    // Defines the static colum specification for the Content Area
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
          path   : "/content/edit",
          urlKey : "id",
        },
        button     : {
          buttonText : "Enter Data",
          link       : {
            path : "/content/data",
            key  : "id",
          },
        },
        name       : "name-col",
        renderType : "buttonLink",
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
      "user-col"       : 100,
      "workbook-col"   : 170,
      "created-at-col" : 100,
      "updated-at-col" : 140,
    };

    this.colSortItems = this.getColumnSortList(props.sortColumn);
    this.createBlankTemplate = this.createBlankTemplate.bind(this);
  }

  componentWillMount() {
    this.props.loadTemplate();
  }

  getActions() {
    const _deleteTemplate = () => {
      const { deleteTemplate, actionsMenu: { selectedKeys } } = this.props;

      if (selectedKeys.length > 1) {
        deleteTemplate({ id : selectedKeys });
      } else {
        deleteTemplate({ id : selectedKeys[0] });
      }
    };

    return {
      deleteTemplate : _deleteTemplate,
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

  createBlankTemplate(data) {
    console.log(data);
    this.props.addTemplate(data);
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }

    const {
      list, actionsMenu, rows, toggleSidebar, selectAll,
      clearSelection, sortColumn, toggleSelection,
    } = this.props;

    const { filterChangeHandlers, filter } = this.props;
    const sortOrderIndex = filter.sortAscending ? 0 : 1;
    const sortKey = filter.sortKey ? this.colSortItems.displayText[filter.sortKey][sortOrderIndex] : null;

    const searchConfig = [
      {
        label         : "Owner",
        data          : filter.owner,
        changeHandler : filterChangeHandlers.setOwner,
        type          : "searchbox",
      },
      {
        label         : "Created on or after",
        data          : filter.dateModifiedStart,
        changeHandler : filterChangeHandlers.setDateModifiedStart,
        type          : "datebox",
      },
      {
        label         : "Created on or before",
        data          : filter.dateModifiedEnd,
        changeHandler : filterChangeHandlers.setDateModifiedEnd,
        type          : "datebox",
      },
      {
        label         : "Show starred only",
        data          : filter.isStarred,
        changeHandler : filterChangeHandlers.setIsStarred,
        type          : "checkbox",
      },
      {
        label         : "Recents only",
        data          : filter.isRecent,
        changeHandler : filterChangeHandlers.setIsRecent,
        type          : "checkbox",
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
          sortKey={sortKey}
          colSortItems={this.colSortItems.items}
          colSortFunction={sortColumn}
          keys={Object.keys(rows)}
          selectAllRows={selectAll}
          clearRowSelection={clearSelection}
          addTemplate={this.createBlankTemplate}
        />

        <div>
          {/* SearchBar Container */}
          {
            actionsMenu.showSidebar &&
            <SearchBar
              className={styles.search}
              config={searchConfig}
            />
          }

          {/* DataGrid Container */}
          <DataGrid
            className={styles.datagrid}
            style={{ left : !actionsMenu.showSidebar && 0 }}
            isLoading={list.isLoading}
            cols={this.colSpec}
            colWidths={this.colWidths}
            rows={rows}
            colSortFunction={sortColumn}
            sortKey={filter.sortKey}
            sortAscending={filter.sortAscending}
            onRowClick={toggleSelection}
            selectedKeys={actionsMenu.selectedKeys}
          />
        </div>
      </div>
    );
  }

  render() {
    const { rollUp } = this.props;

    return (
      <div
        className={styles.base}
        style={{ top : rollUp ? 53 : 0 }}
      >

        {/* Breadcrumb */}
        <Breadcrumb
          className={styles.breadcrumb}
        />

        {this.renderChildren()}
      </div>
    );
  }
}

Content.propTypes = {
  rollUp   : React.PropTypes.bool,
  children : React.PropTypes.node,

  // Store
  list        : React.PropTypes.object.isRequired,
  actionsMenu : React.PropTypes.object.isRequired,
  filter      : React.PropTypes.object.isRequired,
  rows        : React.PropTypes.object.isRequired,

  // Actions
  toggleSidebar        : React.PropTypes.func.isRequired,
  selectAll            : React.PropTypes.func.isRequired,
  clearSelection       : React.PropTypes.func.isRequired,
  toggleSelection      : React.PropTypes.func.isRequired,
  sortColumn           : React.PropTypes.func.isRequired,
  loadTemplate         : React.PropTypes.func.isRequired,
  deleteTemplate       : React.PropTypes.func.isRequired,
  addTemplate          : React.PropTypes.func.isRequired,
  filterChangeHandlers : React.PropTypes.shape({
    setDateModifiedStart : React.PropTypes.func.isRequired,
    setDateModifiedEnd   : React.PropTypes.func.isRequired,
    setOwner             : React.PropTypes.func.isRequired,
    setIsRecent          : React.PropTypes.func.isRequired,
    setIsStarred         : React.PropTypes.func.isRequired,
  }),
};

const filterBindings = {
  dateFilter     : "createdAt",
  textFilter     : "owner",
  recentFilter   : "createdAt",
  favoriteFilter : "favorite",
};

const mapStateToProps = (state) => ({
  list        : state.content.facing.data,
  actionsMenu : state.menu,
  filter      : state.filter,
  rows        : getRows(state.content.facing.data, state.filter, filterBindings),
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar        : () => dispatch(cmActions.toggleMenuSidebar()),
  selectAll            : (keys) => dispatch(cmActions.selectAll(keys)),
  clearSelection       : () => dispatch(cmActions.clearSelection()),
  toggleSelection      : (index) => dispatch(cmActions.toggleSelection(index)),
  sortColumn           : (sortKey, sortOrder) => dispatch(filterActions.sortFilter(sortKey, sortOrder)),
  loadTemplate         : (params) => dispatch(contentActions.loadTemplate(params)),
  deleteTemplate       : (params) => dispatch(contentActions.deleteTemplate(params)),
  addTemplate          : (params) => dispatch(contentActions.addTemplate(params)),
  filterChangeHandlers : {
    setDateModifiedStart : (e) => dispatch(filterActions.setDateModifiedStart(e)),
    setDateModifiedEnd   : (e) => dispatch(filterActions.setDateModifiedEnd(e)),
    setOwner             : (e) => dispatch(filterActions.setOwner(e)),
    setIsRecent          : (e) => dispatch(filterActions.setIsRecent(e)),
    setIsStarred         : (e) => dispatch(filterActions.setIsStarred(e)),
  },
});

export default
connect(mapStateToProps, mapDispatchToProps)(Content);
